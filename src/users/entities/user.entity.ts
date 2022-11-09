import { Exclude } from 'class-transformer';
import BaseEntity from 'src/database/entities/abstract-entity';
import House from 'src/houses/entities/house.entity';
import Subscription from 'src/subscriptions/entities/subscription.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ unique: true, nullable: true })
  public phone: string;

  @Column({ unique: true, nullable: true })
  public forgotPasswordToken?: string;

  @Column({ nullable: true })
  public verifyEmailToken?: string;

  @Column({ nullable: true })
  public verifyPhoneOTP?: string;

  @Column({ nullable: true })
  public maritialStatus?: string;

  @Column({ nullable: true })
  public familySize?: number;

  @OneToMany(() => House, (house: House) => house.owner)
  public houses?: House[];

  @Column({ default: false, nullable: true })
  public isEmailConfirmed: boolean;

  @Column({ default: false, nullable: true })
  public isPhoneConfirmed: boolean;

  @OneToMany(
    () => Subscription,
    (subscription: Subscription) => subscription.customer,
    { eager: true },
  )
  public subscriptions?: Subscription[];

}
