import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public amount: string;

  @Column()
  public reference: string;
}
