import { Response } from 'express';
import { AuthService } from './auth.service';
import { ConfirmEmailDto as VerifyEmailDto } from './dto/confirm-email.dto';
import { RegisterDto } from './dto/register.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import RequestWithUser from './requestWithUser.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../users/entities/user.entity").default>;
    login(request: RequestWithUser, response: Response): Promise<Response<any, Record<string, any>>>;
    logout(request: RequestWithUser, response: Response): Promise<Response<any, Record<string, any>>>;
    authenticate(request: RequestWithUser): void;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    forgotPassword(email: string): Promise<void>;
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<void>;
    verifyPhone(verifyPhoneDto: VerifyPhoneDto): Promise<import("@nestjs/common").HttpStatus>;
    markEmail(token: string): Promise<import("@nestjs/common").HttpStatus>;
    resend(request: RequestWithUser): Promise<void>;
}
