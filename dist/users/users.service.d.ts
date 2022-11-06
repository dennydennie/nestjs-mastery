import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import User from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    getById(userId: string): Promise<User>;
    resetPassword(email: string, password: string, token: string): Promise<void>;
    verifyEmail(email: string, token: string): Promise<User>;
    forgotPassword(email: string): Promise<void>;
}
