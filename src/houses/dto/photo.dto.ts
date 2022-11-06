import { IsArray, IsString } from 'class-validator';

export class PhotoDto {
  @IsString()
  filename: string;

  @IsArray()
  data: Uint8Array;
}
