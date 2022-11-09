import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from './auth.service';
import { ConfirmEmailDto as VerifyEmailDto } from './dto/confirm-email.dto';
import { RegisterDto } from './dto/register.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import RequestWithUser from './requestWithUser.interface';
import { Public } from './strategies/constants';

@ApiExtraModels(VerifyPhoneDto,ResetPasswordDto ,VerifyEmailDto, RegisterDto)
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Create a user',
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'login a user',
  })
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @HttpCode(200)
  @Post('logout')
  @ApiOperation({
    summary: 'logout a user',
  })
  async logout(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      await this?.authService?.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

  @Get()
  @ApiOperation({
    summary: 'Authenticate a user',
  })
  authenticate(@Req() request: RequestWithUser) {
    const { user } = request;
    user.password = undefined;
  }

  @Post('/reset-password')
  @Public()
  @ApiOperation({
    summary: 'Reset a user password, by passing a secret token from email',
  })
  @HttpCode(200)
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    const { email, password, token } = resetPasswordDto;

    await this.authService.resetPassword(email, password, token);
  }

  @Post('/forgot-password')
  @Public()
  @ApiOperation({ summary: 'Send a forgot password email for a login' })
  @HttpCode(200)
  async forgotPassword(@Body('email') email: string): Promise<void> {
    await this.authService.forgotPassword(email);
  }

  @Post('/verify-email')
  @Public()
  @ApiOperation({ summary: 'Verify email address' })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return await this.authService.verifyEmail(verifyEmailDto.email);
  }

  @Post('/verify-phone')
  @Public()
  @ApiOperation({ summary: 'Verify phone number' })
  async verifyPhone(@Body() verifyPhoneDto: VerifyPhoneDto) {
    return await this.authService.verifyPhone(verifyPhoneDto);
  }

  @Post('/mark-email')
  @Public()
  @ApiOperation({ summary: 'Confirm email address' })
  async markEmail(@Query('token') token: string) {
    return await this.authService.markEmail(token);
  }

  @Post('/resend-verify-email')
  @Public()
  async resend(@Req() request: RequestWithUser) {
    await this.authService.resend(request.user.id);
  }
}
