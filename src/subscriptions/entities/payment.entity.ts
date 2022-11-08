import BaseEntity from 'src/database/entities/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export default class Payment extends BaseEntity {
  @Column()
  public amount: string;

  @Column()
  public reference: string;
}
