import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public verifyEmailToken: string;

  @IsString()
  public phone: string;

  @IsNumber()
  @IsOptional()
  public familySize?: number;

  @IsString()
  @IsOptional()
  public maritialStatus?: string;
}
