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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const house_entity_1 = require("./entities/house.entity");
const houses_photo_service_1 = require("./houses-photo.service");
let HousesService = class HousesService {
    constructor(housesRepository, housesPhotoService) {
        this.housesRepository = housesRepository;
        this.housesPhotoService = housesPhotoService;
    }
    create(house, user) {
        const newHouse = this.housesRepository.create(Object.assign(Object.assign({}, house), { owner: user }));
        if (newHouse) {
            return this.housesRepository.save(newHouse);
        }
        throw new common_1.HttpException('Failed to create new house', common_1.HttpStatus.BAD_REQUEST);
    }
    findAll() {
        return this.housesRepository.find();
    }
    async findOneById(id) {
        const house = await this.housesRepository.findOneBy({ id });
        if (house) {
            return house;
        }
        throw new common_1.HttpException('House not found', common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateHouse) {
        await this.housesRepository.update(id, updateHouse);
        const updatedHouse = await this.housesRepository.findOneBy({ id });
        if (updatedHouse) {
            return updatedHouse;
        }
        throw new common_1.HttpException('House not found', common_1.HttpStatus.NOT_FOUND);
    }
    async remove(id) {
        const deleteResponse = await this.housesRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new common_1.HttpException('House not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async addPhoto(houseId, imageBuffer, filename) {
        const photo = await this.housesPhotoService.uploadPhoto(imageBuffer, filename);
        await this.housesRepository.update(houseId, {
            photo: photo,
        });
        return photo;
    }
    async getPhotoById(PhotoId) {
        const file = await this.housesPhotoService.getPhotoById(PhotoId);
        if (!file) {
            throw new common_1.NotFoundException();
        }
        return file;
    }
};
HousesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(house_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        houses_photo_service_1.HousesPhotoService])
], HousesService);
exports.HousesService = HousesService;
//# sourceMappingURL=houses.service.js.map