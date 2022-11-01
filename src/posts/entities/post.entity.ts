import User from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from './category.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public content: string;

  @ManyToOne(() => User, (author: User) => author.posts, { eager: true })
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts, {
    eager: true,
  })
  @JoinTable()
  public categories: Category[];
}
export default Post;
