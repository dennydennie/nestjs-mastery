import AddressDto from 'src/houses/dto/create-address.dto';
import { PhotoDto } from './photo.dto';
export declare class CreateHouseDto {
    address: AddressDto;
    photo: PhotoDto;
    rentalFee: number;
    rentalPeriod: string;
    securityDeposit: number;
    billsIncluded: boolean;
    rooms: number;
    bathrooms: number;
    sharing: boolean;
    hasCouncilWater: boolean;
    hasBoreholeWater: boolean;
    hasElectricity: boolean;
    hasBackupElectricity: boolean;
    status: string;
    hasParkingSpace: boolean;
    isTilled: boolean;
    isWalled: boolean;
    hasOwnEntrance: boolean;
    hasCelling: boolean;
    hasBuiltInCupboards: boolean;
    isRequest?: boolean;
}
