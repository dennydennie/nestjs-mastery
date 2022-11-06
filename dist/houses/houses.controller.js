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
const common_1 = require("@nestjs/common");
const houses_service_1 = require("./houses.service");
const create_house_dto_1 = require("./dto/create-house.dto");
const update_house_dto_1 = require("./dto/update-house.dto");
const jwtAuthGuard_guard_1 = require("../auth/strategies/jwt/jwtAuthGuard.guard");
const swagger_1 = require("@nestjs/swagger");
const house_dto_1 = require("./dto/house.dto");
let HousesController = class HousesController {
    constructor(housesService) {
        this.housesService = housesService;
    }
    create(house, req) {
        return this.housesService.create(house, req.user);
    }
    async findAll() {
        const houses = await this.housesService.findAll();
        const allHouses = Promise.all(houses.map((house) => house_dto_1.default.fromModel(house)));
        return allHouses;
    }
    findOne(id) {
        return this.housesService.findOneById(id);
    }
    update(id, updateHouseDto) {
        return this.housesService.update(id, updateHouseDto);
    }
    remove(id) {
        return this.housesService.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_guard_1.default),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_house_dto_1.CreateHouseDto, Object]),
    __metadata("design:returntype", void 0)
], HousesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HousesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_house_dto_1.UpdateHouseDto]),
    __metadata("design:returntype", void 0)
], HousesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HousesController.prototype, "remove", null);
HousesController = __decorate([
    (0, common_1.Controller)('houses'),
    (0, swagger_1.ApiTags)('Houses'),
    __metadata("design:paramtypes", [houses_service_1.HousesService])
], HousesController);
exports.HousesController = HousesController;
//# sourceMappingURL=houses.controller.js.map