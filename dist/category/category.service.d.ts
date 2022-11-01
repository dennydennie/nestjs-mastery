import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import Category from './entities/category.entity';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findOneById(id: number): Promise<Category>;
    update(id: number, updateCategory: UpdateCategoryDto): Promise<Category[]>;
}
