import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import Post from './entities/post.entity';
export declare class PostsService {
    private postsRepository;
    constructor(postsRepository: Repository<Post>);
    create(post: CreatePostDto, user: User): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOneById(id: number): Promise<Post>;
    update(id: number, updatePost: UpdatePostDto): Promise<Post>;
    remove(id: number): Promise<void>;
}
