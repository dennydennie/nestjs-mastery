import User from 'src/users/entities/user.entity';
import { Payment } from './payment.entity';
export declare class Subscription {
    id: string;
    customer: User;
    type: string;
    payment: Payment;
}
