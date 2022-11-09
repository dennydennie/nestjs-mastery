import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  verifyEmailToken: string;

  @IsString()
  verifyPhoneOTP: string;

  @IsString()
  phone: string;

  @IsNumber()
  @IsOptional()
  familySize?: number;

  @IsString()
  @IsOptional()
  maritialStatus?: string
}
