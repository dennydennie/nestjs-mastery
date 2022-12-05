import BaseEntity from 'src/database/entities/abstract-entity';
import User from 'src/users/entities/user.entity';
export default class Subscription extends BaseEntity {
    customer: User;
    type: string;
    expiryDate: Date;
    paymentId?: string;
}
