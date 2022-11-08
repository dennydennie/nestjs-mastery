import BaseEntity  from 'src/database/entities/abstract-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Photo extends BaseEntity{
  @Column()
  filename: string;

  @Column({
    type: 'bytea',
  })
  data: Uint8Array;
}
