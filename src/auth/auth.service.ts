import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...registerDto,
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

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication =${token}; httpOnly: Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
