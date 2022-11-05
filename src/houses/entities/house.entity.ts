import { Address } from 'src/addresses/entities/addresses.entity';
import User from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
