import User from '../entities/user.entity';
export default class UserDto {
    id: string;
    name: string;
    email: string;
    static fromModel(user: User): Promise<UserDto>;
}
