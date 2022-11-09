import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPhoneDto {
  @IsString()
  @IsNotEmpty()
  public phone: string;

  @IsString()
  @IsNotEmpty()
  public verifyPhoneOTP: string;
}
