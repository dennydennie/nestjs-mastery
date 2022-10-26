import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';


@Injectable()
export class UsersService {
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

  async getById(userId: number) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (user) {
      user.password = undefined;
      return user;
    }
    throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
  }
}
