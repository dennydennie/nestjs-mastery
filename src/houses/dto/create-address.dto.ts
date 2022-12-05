import { IsString } from 'class-validator';
import Address from '../entities/address.entity';

export default class AddressDto {
  @IsString()
  public houseNumber: string;

  @IsString()
  public street: string;

  @IsString()
  public location: string;

  @IsString()
  public city: string;

  static fromModel(address: Address): AddressDto {
    return {
      houseNumber: address.houseNumber,
      street: address.street,
      location: address.location,
      city: address.city,
    };
  }
}
