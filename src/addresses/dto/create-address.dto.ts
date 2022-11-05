import { IsNumber, IsString } from 'class-validator';

export default class AddressDto {
  @IsString()
  public houseNumber: string;

  @IsString()
  public street: string;

  @IsString()
  public location: string;

  @IsString()
  public city: string;
}
