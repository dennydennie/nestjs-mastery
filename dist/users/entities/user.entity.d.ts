import Address from './address.entity';
import Post from '../../posts/entities/post.entity';
declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    address: Address;
    posts: Post[];
}
export default User;
