import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<import("../users/entities/user.entity").default>;
    getUser(loginDto: LoginDto): Promise<import("../users/entities/user.entity").default>;
    getCookieWithJwtToken(userId: string): string;
    getCookieForLogOut(): string;
    resetPassword(email: string, password: string, token: string): Promise<void>;
    forgotPassword(email: string): Promise<void>;
    markEmail(token: string): Promise<HttpStatus>;
    verifyPhone(verifyPhoneDto: VerifyPhoneDto): Promise<HttpStatus>;
    verifyEmail(email: string): Promise<void>;
    resend(userId: string): Promise<void>;
}
