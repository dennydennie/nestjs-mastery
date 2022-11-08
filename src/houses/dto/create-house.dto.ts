import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import AddressDto from 'src/houses/dto/create-address.dto';
import { PhotoDto } from './photo.dto';

export class CreateHouseDto {
  @IsObject()
  public address: AddressDto;

  @IsObject()
  public photo: PhotoDto;

  @IsNumber()
  public rentalFee: number;

  @IsString()
  public rentalPeriod: string;

  @IsNumber()
  public securityDeposit: number;

  @IsBoolean()
  public billsIncluded: boolean;

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

  @IsBoolean()
  public status: string;

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

  @IsBoolean()
  public hasBuiltInCupboards: boolean;

  @IsBoolean()
  @IsOptional()
  public isRequest?: boolean
}
