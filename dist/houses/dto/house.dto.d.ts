import AddressDto from 'src/houses/dto/create-address.dto';
import UserDto from 'src/users/dto/user.dto';
import { House } from '../entities/house.entity';
export default class HouseDto {
    id: string;
    rentalFee: number;
    photo?: any;
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
    hasParkingSpace: boolean;
    isTilled: boolean;
    isWalled: boolean;
    hasOwnEntrance: boolean;
    hasCelling: boolean;
    static fromModel(house: House): HouseDto;
}
