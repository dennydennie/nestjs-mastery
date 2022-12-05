import BaseEntity from 'src/database/entities/abstract-entity';
export default class Address extends BaseEntity {
    houseNumber: string;
    street: string;
    location: string;
    city: string;
}
