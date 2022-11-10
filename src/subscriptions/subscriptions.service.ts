import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserDto from 'src/users/dto/user.dto';
import { IsNull, Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import Payment from './entities/payment.entity';
import Subscription from './entities/subscription.entity';
import * as moment from 'moment';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async create(user: UserDto, createSubscriptionDto: CreateSubscriptionDto) {
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
        await this.paymentRepository.update(
          {
            id: payment.id,
          },
          {
            isClaimed: true,
          },
        );

        return await this.subscriptionsRepository.save(newSubscription);
      }
    }

    throw new HttpException(
      'Invalid payment reference',
      HttpStatus.BAD_REQUEST,
    );
  }

  async findAll() {
    return await this.subscriptionsRepository.findBy({
      deletedAt: IsNull(),
    });
  }

  async findOne(id: string) {
    const subscription = await this.subscriptionsRepository.findOneBy({
      id,
    });
    if (!subscription) {
      throw new HttpException(
        'Subscription is not available',
        HttpStatus.NOT_FOUND,
      );
    }
    return subscription;
  }

  async remove(id: string) {
    return await this.subscriptionsRepository.softDelete(id);
  }

  async check(userId: string): Promise<boolean> {
    
    const subscription = await this.subscriptionsRepository.findOneBy({
      customer: { id: userId },
    });

    if (subscription) {
      return subscription.expiryDate > new Date();
    } else if (!subscription) {
      return false;
    }
  }
}
