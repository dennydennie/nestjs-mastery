import { BaseEntity } from 'src/database/entities/abstract-entity';
import User from 'src/users/entities/user.entity';
import Payment from './payment.entity';
export default class Subscription extends BaseEntity {
    customer: User;
    type: string;
    payment: Payment;
}
