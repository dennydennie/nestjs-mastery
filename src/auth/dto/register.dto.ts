import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  verifyEmailToken: string;

  @IsString()
  phone: string;

  @IsNumber()
  @IsOptional()
  familySize?: number;

  @IsString()
  @IsOptional()
  maritialStatus?: string;
}
