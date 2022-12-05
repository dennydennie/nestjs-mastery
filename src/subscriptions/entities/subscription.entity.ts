import BaseEntity from 'src/database/entities/abstract-entity';
import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export default class Subscription extends BaseEntity {
  @ManyToOne(() => User, (user: User) => user.subscriptions)
  public customer: User;

  @Column()
  public type: string;

  @Column()
  public expiryDate: Date;

  @Column({ nullable: true })
  public paymentId?: string;
}
