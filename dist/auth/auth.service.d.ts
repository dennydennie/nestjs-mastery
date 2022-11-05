import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<import("../users/entities/user.entity").default>;
    getUser(loginDto: LoginDto): Promise<import("../users/entities/user.entity").default>;
    getCookieWithJwtToken(userId: string): string;
    getCookieForLogOut(): string;
}
