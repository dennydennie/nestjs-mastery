import User from 'src/users/entities/user.entity';
import Category from '../../category/entities/category.entity';
declare class Post {
    id: number;
    name: string;
    content: string;
    author: User;
    categories: Category[];
}
export default Post;
