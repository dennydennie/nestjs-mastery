import AddressDto from 'src/addresses/dto/create-address.dto';
import UserDto from 'src/users/dto/user.dto';
import { House } from '../entities/house.entity';
export default class HouseDto {
    id: string;
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
    address: AddressDto;
    owner: UserDto;
    static fromModel(house: House): Promise<HouseDto>;
}
