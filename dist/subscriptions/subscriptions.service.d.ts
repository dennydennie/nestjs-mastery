import UserDto from 'src/users/dto/user.dto';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import Payment from './entities/payment.entity';
import Subscription from './entities/subscription.entity';
export declare class SubscriptionsService {
    private subscriptionsRepository;
    private paymentRepository;
    constructor(subscriptionsRepository: Repository<Subscription>, paymentRepository: Repository<Payment>);
    create(user: UserDto, createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription>;
    findAll(): Promise<Subscription[]>;
    findOne(id: string): Promise<Subscription>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
    check(userId: string): Promise<boolean>;
}
