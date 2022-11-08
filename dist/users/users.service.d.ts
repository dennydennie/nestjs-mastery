import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import User from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    private configService;
    private emailService;
    private jwtService;
    constructor(userRepository: Repository<User>, configService: ConfigService, emailService: EmailService, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    getById(userId: string): Promise<User>;
    resetPassword(email: string, password: string, token: string): Promise<void>;
    forgotPassword(email: string): Promise<void>;
    verifyEmail(email: string): Promise<void>;
    markEmail(token: string): Promise<HttpStatus>;
}
export declare function randomString(): string;
