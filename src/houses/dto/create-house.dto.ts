import { IsBoolean, IsNumber, IsObject, IsString } from "class-validator";
import AddressDto from "src/addresses/dto/create-address.dto";

export class CreateHouseDto {
    @IsObject()
    public address: AddressDto;

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
    public status: string
}
