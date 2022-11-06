import User from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from './payment.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToMany(() => User, (user: User) => user.subscriptions)
  public customer: User;

  @Column()
  public type: string;

  @OneToOne(() => Payment, { eager: true })
  @JoinColumn()
  public payment: Payment;
}
