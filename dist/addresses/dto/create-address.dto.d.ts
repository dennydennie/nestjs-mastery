import { Address } from '../../houses/entities/addresses.entity';
export default class AddressDto {
    houseNumber: string;
    street: string;
    location: string;
    city: string;
    static fromModel(address: Address): Promise<AddressDto>;
}
