import Address from '../entities/address.entity';
export default class AddressDto {
    houseNumber: string;
    street: string;
    location: string;
    city: string;
    static fromModel(address: Address): AddressDto;
}
