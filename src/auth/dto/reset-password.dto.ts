import { IsString } from 'class-validator';

export default class ResetPasswordDto {
  @IsString()
  public password: string;

  @IsString()
  public email: string;

  @IsString()
  public token: string;
}
