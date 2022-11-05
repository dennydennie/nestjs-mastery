import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { House } from 'src/houses/entities/house.entity';

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

  @OneToMany(() => House, (house: House) => house.owner)
  public houses?: House[];
}

export default User;
