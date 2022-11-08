import BaseEntity from 'src/database/entities/abstract-entity';
import Address from 'src/houses/entities/address.entity';
import User from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import Photo from './photo.entity';

@Entity()
export default class House extends BaseEntity {
  @OneToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  public address: Address;

  @ManyToOne(() => User, (owner: User) => owner.houses, {
    eager: true,
    cascade: true,
  })
  public owner: User;

  @OneToOne(() => Photo, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  public photo?: Photo;

  @Column()
  public rentalFee: number;

  @Column()
  public rentalPeriod: string;

  @Column()
  public billsIncluded: boolean;

  @Column()
  public securityDeposit: number;

  @Column()
  public rooms: number;

  @Column()
  public bathrooms: number;

  @Column()
  public sharing: boolean;

  @Column()
  public hasCouncilWater: boolean;

  @Column()
  public hasBoreholeWater: boolean;

  @Column()
  public hasElectricity: boolean;

  @Column({default: false})
  public hasBackupElectricity: boolean;

  @Column()
  public status: string;

  @Column({ nullable: true, default: false })
  public hasParkingSpace: boolean;

  @Column({ nullable: true, default: false })
  public isTilled: boolean;

  @Column({ nullable: true, default: false })
  public isWalled: boolean;

  @Column({ nullable: true, default: false })
  public hasOwnEntrance: boolean;

  @Column({ nullable: true , default: false})
  public hasCelling: boolean;

  @Column({ nullable: true, default: false })
  public hasBuiltInCupboards: boolean;

  @Column({ nullable: true, default: false })
  public isRequest?: boolean;
}
