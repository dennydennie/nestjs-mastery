import { StreamableFile } from '@nestjs/common';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import AddressDto from 'src/houses/dto/create-address.dto';
import UserDto from 'src/users/dto/user.dto';
import { Readable } from 'stream';
import House from '../entities/house.entity';

export default class HouseDto {
  @IsString()
  public id: string;

  @IsNumber()
  public rentalFee: number;

  @IsObject()
  public photo?: any;

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

  @IsBoolean()
  public hasParkingSpace: boolean;

  @IsBoolean()
  public isTilled: boolean;

  @IsBoolean()
  public isWalled: boolean;

  @IsBoolean()
  public hasOwnEntrance: boolean;

  @IsBoolean()
  public hasCelling: boolean;

  static fromModel(house: House): HouseDto {
    const stream = house?.photo && Readable.from(house?.photo?.data);

    return {
      id: house.id,
      photo: house.photo ? new StreamableFile(stream) : undefined,
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
      address: AddressDto.fromModel(house.address),
      owner: UserDto.fromModel(house.owner),
      hasParkingSpace: house.hasParkingSpace,
      isTilled: house.isTilled,
      isWalled: house.isWalled,
      hasOwnEntrance: house.hasOwnEntrance,
      hasCelling: house.hasCelling,
    };
  }
}
