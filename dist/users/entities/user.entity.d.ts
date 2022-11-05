import { House } from 'src/houses/entities/house.entity';
declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    houses?: House[];
}
export default User;
