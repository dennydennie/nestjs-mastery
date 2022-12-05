import BaseEntity from 'src/database/entities/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export default class Payment extends BaseEntity {
  @Column()
  public amount: number;

  @Column()
  public reference: string;

  @Column({ default: false, nullable: true })
  public isClaimed: boolean;
}
