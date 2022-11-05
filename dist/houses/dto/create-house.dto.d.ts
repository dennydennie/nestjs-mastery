import AddressDto from "src/addresses/dto/create-address.dto";
export declare class CreateHouseDto {
    address: AddressDto;
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
}
