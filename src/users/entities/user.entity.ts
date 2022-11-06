import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { House } from 'src/houses/entities/house.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ unique: true })
  public phone: string;

  @Column()
  public forgotPasswordToken: string;

  @Column()
  public verifyEmailToken; string;

  @Column()
  public maritialStatus?: string;

  @Column()
  public familySize?: number;

  @OneToMany(() => House, (house: House) => house.owner)
  public houses?: House[];

  @OneToMany(
    () => Subscription,
    (subscription: Subscription) => subscription.customer,
    { eager: true },
  )
  public subscriptions?: Subscription[];
}

export default User;
