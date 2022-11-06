import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    create(createSubscriptionDto: CreateSubscriptionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSubscriptionDto: UpdateSubscriptionDto): string;
    remove(id: string): string;
}
