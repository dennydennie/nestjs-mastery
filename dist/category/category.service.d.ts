import Category from 'src/posts/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): string;
    findAll(): string;
    findOneById(id: number): Promise<Category>;
    update(id: number, updateCategory: UpdateCategoryDto): Promise<Category[]>;
    remove(id: number): string;
}
