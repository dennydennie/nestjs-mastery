import BaseEntity from 'src/database/entities/abstract-entity';
export default class Payment extends BaseEntity {
    amount: string;
    reference: string;
}
