import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public houseNumber: string;

  @Column()
  public street: string;

  @Column()
  public location: string;

  @Column()
  public city: string;
}
