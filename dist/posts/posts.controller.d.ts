import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): Promise<import("./entities/post.entity").default>;
    findAll(): Promise<import("./entities/post.entity").default[]>;
    findOne(id: string): Promise<import("./entities/post.entity").default>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity").default>;
    remove(id: string): Promise<void>;
}
