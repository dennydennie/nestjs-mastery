import  BaseEntity  from 'src/database/entities/abstract-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Address extends BaseEntity {
  @Column()
  public houseNumber: string;

  @Column()
  public street: string;

  @Column()
  public location: string;

  @Column()
  public city: string;
}
