import { IsNotEmpty, IsString } from 'class-validator';

export class MarkEmailDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
