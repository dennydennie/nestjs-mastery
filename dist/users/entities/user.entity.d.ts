import House from 'src/houses/entities/house.entity';
import { BaseEntity } from 'src/database/entities/abstract-entity';
import Subscription from 'src/subscriptions/entities/subscription.entity';
export default class User extends BaseEntity {
    name: string;
    email: string;
    password: string;
    phone: string;
    forgotPasswordToken?: string;
    verifyEmailToken?: string;
    maritialStatus?: string;
    familySize?: number;
    houses?: House[];
    isEmailConfirmed: boolean;
    subscriptions?: Subscription[];
}
