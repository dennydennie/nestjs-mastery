import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import AddressDto from 'src/addresses/dto/create-address.dto';
import UserDto from 'src/users/dto/user.dto';
import { House } from '../entities/house.entity';

export default class HouseDto {
  @IsString()
  public id: string;

  @IsNumber()
  public rentalFee: number;

  @IsString()
  public rentalPeriod: string;

  @IsBoolean()
  public billsIncluded: boolean;

  @IsNumber()
  public securityDeposit: number;

  @IsNumber()
  public rooms: number;

  @IsNumber()
  public bathrooms: number;

  @IsBoolean()
  public sharing: boolean;

  @IsBoolean()
  public hasCouncilWater: boolean;

  @IsBoolean()
  public hasBoreholeWater: boolean;

  @IsBoolean()
  public hasElectricity: boolean;

  @IsBoolean()
  public hasBackupElectricity: boolean;

  @IsString()
  public status: string;

  @IsObject()
  public address: AddressDto;

  @IsObject()
  public owner: UserDto;

  static async fromModel(house: House): Promise<HouseDto> {
    return {
      id: house.id,
      rentalFee: house.rentalFee,
      rentalPeriod: house.rentalPeriod,
      billsIncluded: house.billsIncluded,
      securityDeposit: house.securityDeposit,
      rooms: house.rooms,
      bathrooms: house.bathrooms,
      sharing: house.sharing,
      hasCouncilWater: house.hasCouncilWater,
      hasBoreholeWater: house.hasBoreholeWater,
      hasElectricity: house.hasElectricity,
      hasBackupElectricity: house.hasBackupElectricity,
      status: house.status,
      address: await AddressDto.fromModel(house.address),
      owner: await UserDto.fromModel(house.owner),
    };
  }
}
