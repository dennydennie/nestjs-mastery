import { Address } from 'src/houses/entities/address.entity';
import User from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class House {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  public address: Address;

  @ManyToOne(() => User, (owner: User) => owner.houses, {
    eager: true,
    cascade: true,
  })
  public owner: User;

  @JoinColumn()
  @OneToOne(() => Photo, {
    eager: true,
    cascade: true,
    nullable: true,
  })
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

  @Column()
  public hasBackupElectricity: boolean;

  @Column()
  public status: string;

  @Column({ nullable: true })
  public hasParkingSpace: boolean;

  @Column({ nullable: true })
  public isTilled: boolean;

  @Column({ nullable: true })
  public isWalled: boolean;

  @Column({ nullable: true })
  public hasOwnEntrance: boolean;

  @Column({ nullable: true })
  public hasCelling: boolean;
}
