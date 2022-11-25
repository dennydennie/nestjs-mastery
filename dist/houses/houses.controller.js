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
exports.HousesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const subscriptions_service_1 = require("../subscriptions/subscriptions.service");
const create_house_dto_1 = require("./dto/create-house.dto");
const house_dto_1 = require("./dto/house.dto");
const update_house_dto_1 = require("./dto/update-house.dto");
const houses_service_1 = require("./houses.service");
let HousesController = class HousesController {
    constructor(housesService, subscriptionsService) {
        this.housesService = housesService;
        this.subscriptionsService = subscriptionsService;
    }
    create(house, req) {
        return this.housesService.create(house, req.user);
    }
    async findAll(req) {
        const isSubscribed = await this.subscriptionsService.check(req.user.id);
        const houseEntities = await this.housesService.findAll();
        const houses = houseEntities.map((house) => house_dto_1.default.fromModel(house, isSubscribed));
        return houses;
    }
    async findOne(id, req) {
        const isSubscribed = await this.subscriptionsService.check(req.user.id);
        const houseEntity = await this.housesService.findOneById(id);
        return house_dto_1.default.fromModel(houseEntity, isSubscribed);
    }
    update(id, updateHouseDto) {
        return this.housesService.update(id, updateHouseDto);
    }
    remove(id) {
        return this.housesService.remove(id);
    }
    async addPhoto(id, file) {
        return this.housesService.addPhoto(id, file.buffer, file.originalname);
    }
    async getPhotoyId(id) {
        const file = await this.housesService.getPhotoById(id);
        return file.data;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a house',
    }),
    openapi.ApiResponse({ status: 201, type: require("./entities/house.entity").default }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_house_dto_1.CreateHouseDto, Object]),
    __metadata("design:returntype", void 0)
], HousesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Find all houses',
    }),
    openapi.ApiResponse({ status: 200, type: [require("./dto/house.dto").default] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find nne house by id',
    }),
    openapi.ApiResponse({ status: 200, type: require("./dto/house.dto").default }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a house',
    }),
    openapi.ApiResponse({ status: 200, type: require("./entities/house.entity").default }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_house_dto_1.UpdateHouseDto]),
    __metadata("design:returntype", void 0)
], HousesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove a house by id',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HousesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('photo/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Upload one photo for each house',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201, type: require("./entities/photo.entity").default }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "addPhoto", null);
__decorate([
    (0, common_1.Get)('photo/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "getPhotoyId", null);
HousesController = __decorate([
    (0, common_1.Controller)('houses'),
    (0, swagger_1.ApiTags)('Houses'),
    __metadata("design:paramtypes", [houses_service_1.HousesService,
        subscriptions_service_1.SubscriptionsService])
], HousesController);
exports.HousesController = HousesController;
//# sourceMappingURL=houses.controller.js.map