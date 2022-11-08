import { BaseEntity } from 'src/database/entities/abstract-entity';
import User from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import Payment from './payment.entity';

@Entity()
export default class Subscription extends BaseEntity {
  @OneToMany(() => User, (user: User) => user.subscriptions)
  public customer: User;

  @Column()
  public type: string;

  @OneToOne(() => Payment, { eager: true })
  @JoinColumn()
  public payment: Payment;
}
