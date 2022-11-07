import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  emailService: any;
  configService: any;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    if (newUser) {
      await this.userRepository.save(newUser);
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
    user.verifyEmailToken = null;

    await this.userRepository.save(user);
  }

  async verifyEmail(email: string, token: string) {
    const user = await this.userRepository.findOneBy({
      email,
      verifyEmailToken: token,
    });

    if (!user) {
      return;
    }

    user.verifyEmailToken = null;

    return await this.userRepository.save(user);
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      return;
    }

    user.forgotPasswordToken = crypto.randomUUID();

    await this.userRepository.save(user);

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${
      user.forgotPasswordToken
    }`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    });
  }

  async markEmail(email: string) {
    return this.userRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }
}
