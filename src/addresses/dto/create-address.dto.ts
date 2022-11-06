import { IsNumber, IsString } from 'class-validator';
import { Address } from '../entities/addresses.entity';

export default class AddressDto {
  @IsString()
  public houseNumber: string;

  @IsString()
  public street: string;

  @IsString()
  public location: string;

  @IsString()
  public city: string;

  static async fromModel(address: Address): Promise<AddressDto> {
    return {
      houseNumber: address.houseNumber,
      street: address.street,
      location: address.location,
      city: address.city,
    };
  }
}
