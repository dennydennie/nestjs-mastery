import { Address } from 'src/houses/entities/address.entity';
import User from 'src/users/entities/user.entity';
import { Photo } from './photo.entity';
export declare class House {
    id: string;
    address: Address;
    owner: User;
    photo?: Photo;
    rentalFee: number;
    rentalPeriod: string;
    billsIncluded: boolean;
    securityDeposit: number;
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
}
