"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    create(createCategoryDto) {
        return 'This action adds a new category';
    }
    findAll() {
        return `This action returns all category`;
    }
    async findOneById(id) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (category) {
            return category;
        }
        throw new common_1.HttpException('Category does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateCategory) {
        await this.categoryRepository.update(id, updateCategory);
        const updatedCategory = await this.categoryRepository.findBy({ id });
        if (updatedCategory) {
            return updatedCategory;
        }
        throw new common_1.HttpException('Category does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    remove(id) {
        return `This action removes a #${id} category`;
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map