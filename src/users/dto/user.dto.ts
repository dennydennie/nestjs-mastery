import { IsString } from 'class-validator';
import User from '../entities/user.entity';

export default class UserDto {
  @IsString()
  public id: string;
  @IsString()
  public name: string;
  @IsString()
  public email: string;

  static fromModel(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
