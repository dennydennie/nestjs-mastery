import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { validate } from 'bycontract';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';
import {
  generateOTP,
  randomString,
  UsersService,
} from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import TokenPayload from './tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  public async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const verifyEmailToken = randomString();
    const verifyPhoneOTP = generateOTP();

    try {
      const createdUser = await this.usersService.create({
        ...registerDto,
        verifyEmailToken,
        verifyPhoneOTP,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'Email address has to be uniqie',
          HttpStatus.BAD_GATEWAY,
        );
      }

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getUser(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(loginDto.email);
      const isPasswordMatching = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!isPasswordMatching) {
        throw new HttpException(
          'Invalid login details',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Invalid login details', HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication =${token}; httpOnly: Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async resetPassword(email: string, password: string, token: string) {
    validate([email, password, token], ['string', 'string', 'string']);

    await this.usersService.resetPassword(email, password, token);
  }

  async forgotPassword(email: string) {
    validate([email], ['string']);

    this.usersService.forgotPassword(email);
  }

  async markEmail(token: string) {
    return await this.usersService.markEmail(token);
  }

  async verifyPhone(verifyPhoneDto: VerifyPhoneDto) {
    return await this.usersService.verifyPhone(verifyPhoneDto);
  }

  async verifyEmail(email: string) {
    const sendEmailResponse = await this.usersService.verifyEmail(email);
  }

  async resend(userId: string) {
    const user = await this.usersService.getById(userId);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    await this.usersService.verifyEmail(user.email);
  }
}
