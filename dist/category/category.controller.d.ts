import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): string;
    findAll(): string;
    findOne(id: string): any;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("../posts/entities/category.entity").default[]>;
    remove(id: string): string;
}
