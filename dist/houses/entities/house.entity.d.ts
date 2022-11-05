import { Address } from 'src/addresses/entities/addresses.entity';
import User from 'src/users/entities/user.entity';
export declare class House {
    id: string;
    address: Address;
    owner: User;
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
}
