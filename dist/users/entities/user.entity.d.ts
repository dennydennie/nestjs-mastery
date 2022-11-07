import { House } from 'src/houses/entities/house.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    forgotPasswordToken: string;
    verifyEmailToken: string;
    maritialStatus?: string;
    familySize?: number;
    houses?: House[];
    isEmailConfirmed: boolean;
    subscriptions?: Subscription[];
}
export default User;
