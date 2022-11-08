import RequestWithUser from 'src/auth/requestWithUser.interface';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    create(request: RequestWithUser, createSubscriptionDto: CreateSubscriptionDto): Promise<import("./entities/subscription.entity").default>;
    findAll(): Promise<import("./entities/subscription.entity").default[]>;
    findOne(id: string): Promise<import("./entities/subscription.entity").default>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
