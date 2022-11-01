import Post from 'src/posts/entities/post.entity';
declare class Category {
    id: number;
    name: string;
    posts: Post[];
}
export default Category;
