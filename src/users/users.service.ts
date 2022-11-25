import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { VerifyPhoneDto } from 'src/auth/dto/verify-phone.dto';
import { EmailService } from 'src/email/email.service';
import { SmsService } from 'src/sms/sms.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
    private emailService: EmailService,
    private jwtService: JwtService,
    private smsService: SmsService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    if (newUser) {
      await this.userRepository.save(newUser);
      await this.verifyEmail(newUser.email);
      await this.smsService.send(newUser.phone, newUser.verifyPhoneOTP);
      return newUser;
    }
    throw new HttpException('Failed to add new user', HttpStatus.BAD_REQUEST);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    if (user) {
      return user;
    }
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async getById(userId: string) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (user) {
      user.password = undefined;
      return user;
    }
    throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
  }

  async resetPassword(email: string, password: string, token: string) {
    const user = await this.userRepository.findOneBy({
      email,
      forgotPasswordToken: token,
    });

    if (!user) {
      throw new InternalServerErrorException();
    }

    user.password = await bcrypt.hash(password, 10);
    user.forgotPasswordToken = null;

    await this.userRepository.save(user);
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      return;
    }

    user.forgotPasswordToken = randomString();

    await this.userRepository.save(user);

    const token = this.jwtService.sign(
      {
        email: email,
        forgotPasswordToken: user.forgotPasswordToken,
      },
      { secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET') },
    );

    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}reset-password?token=${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return this.emailService.sendMail(email, 'Reset Account', text, url);
  }

  async verifyEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user || !!user.isEmailConfirmed) {
      return;
    }

    if (user && !!user.isEmailConfirmed) {
      throw new BadRequestException('Email already confimed');
    }

    const token = this.jwtService.sign(
      {
        email: email,
        verifyEmailToken: user.verifyEmailToken,
      },
      { secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET') },
    );

    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}mark-email?token=${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return this.emailService.sendMail(email, 'On Boarding', text, url);
  }

  async markEmail(token: string) {
    const decoded = this.jwtService.decode(
      token,
      this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
    );

    //@ts-ignore
    const email = decoded.email;

    const user = await this.userRepository.findOneBy({
      email,
    });

    if (user && !user.isEmailConfirmed) {
      const updateResponse = await this.userRepository.update(
        {
          id: user.id,
        },
        {
          verifyEmailToken: null,
          isEmailConfirmed: true,
        },
      );
      if (updateResponse.affected === 1) return HttpStatus.CREATED;
    }
    throw new HttpException(
      'Email has already been verified',
      HttpStatus.BAD_REQUEST,
    );
  }

  async verifyPhone(verifyPhoneDto: VerifyPhoneDto) {
    const user = await this.userRepository.findOneBy({
      phone: verifyPhoneDto.phone,
      verifyPhoneOTP: verifyPhoneDto.verifyPhoneOTP,
    });

    if (user && !user.isPhoneConfirmed) {
      const updateResponse = await this.userRepository.update(
        {
          id: user.id,
        },
        {
          verifyPhoneOTP: null,
          isPhoneConfirmed: true,
        },
      );
      if (updateResponse.affected === 1) return HttpStatus.CREATED;
    }
    throw new HttpException(
      'Phone number has already been verified',
      HttpStatus.BAD_REQUEST,
    );
  }
}

//move to utils
export function randomString() {
  let result = '';
  const length = 48;
  const dictionary =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var dictionaryLength = dictionary.length;
  for (var i = 0; i < length; i++) {
    result += dictionary.charAt(Math.floor(Math.random() * dictionaryLength));
  }
  return result;
}

export function generateOTP() {
  let result = '';
  const length = 6;
  const dictionary = '0123456789';
  var dictionaryLength = dictionary.length;
  for (var i = 0; i < length; i++) {
    result += dictionary.charAt(Math.floor(Math.random() * dictionaryLength));
  }
  return result;
}
