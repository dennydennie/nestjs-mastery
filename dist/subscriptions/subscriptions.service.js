"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const subscription_entity_1 = require("./entities/subscription.entity");
const moment = require("moment");
let SubscriptionsService = class SubscriptionsService {
    constructor(subscriptionsRepository, paymentRepository) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.paymentRepository = paymentRepository;
    }
    async create(user, createSubscriptionDto) {
        const payment = await this.paymentRepository.findOneBy({
            reference: createSubscriptionDto.paymentReference,
            isClaimed: false,
        });
        if (payment) {
            const newSubscription = await this.subscriptionsRepository.create({
                customer: user,
                type: 'Basic',
                paymentId: payment.id,
                expiryDate: moment(new Date()).add(30, 'days').toDate(),
            });
            if (newSubscription) {
                await this.paymentRepository.update({
                    id: payment.id,
                }, {
                    isClaimed: true,
                });
                return await this.subscriptionsRepository.save(newSubscription);
            }
        }
        throw new common_1.HttpException('Invalid payment reference', common_1.HttpStatus.BAD_REQUEST);
    }
    async findAll() {
        return await this.subscriptionsRepository.findBy({
            deletedAt: (0, typeorm_2.IsNull)(),
        });
    }
    async findOne(id) {
        const subscription = await this.subscriptionsRepository.findOneBy({
            id,
        });
        if (!subscription) {
            throw new common_1.HttpException('Subscription is not available', common_1.HttpStatus.NOT_FOUND);
        }
        return subscription;
    }
    async remove(id) {
        return await this.subscriptionsRepository.softDelete(id);
    }
    async check(userId) {
        const subscription = await this.subscriptionsRepository.findOneBy({
            customer: { id: userId },
        });
        if (subscription) {
            return subscription.expiryDate > new Date();
        }
        else if (!subscription) {
            return false;
        }
    }
};
SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubscriptionsService);
exports.SubscriptionsService = SubscriptionsService;
//# sourceMappingURL=subscriptions.service.js.map