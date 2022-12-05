import BaseEntity from 'src/database/entities/abstract-entity';
export default class Payment extends BaseEntity {
    amount: number;
    reference: string;
    isClaimed: boolean;
}
