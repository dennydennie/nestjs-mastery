import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<User>;
    getUser(loginDto: LoginDto): Promise<User>;
    getCookieWithJwtToken(userId: string): string;
    getCookieForLogOut(): string;
    resetPassword(email: string, password: string, token: string): Promise<void>;
    verifyEmail(email: string, token: string): Promise<User>;
    forgotPassword(email: string): Promise<void>;
    decode(token: string): Promise<any>;
    confirm(email: string): Promise<void>;
    resend(userId: string): Promise<void>;
}
