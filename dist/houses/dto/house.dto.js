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
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_address_dto_1 = require("./create-address.dto");
const user_dto_1 = require("../../users/dto/user.dto");
const stream_1 = require("stream");
class HouseDto {
    static fromModel(house, isSubscribed) {
        var _a;
        const stream = (house === null || house === void 0 ? void 0 : house.photo) && stream_1.Readable.from((_a = house === null || house === void 0 ? void 0 : house.photo) === null || _a === void 0 ? void 0 : _a.data);
        return {
            id: house.id,
            photo: house.photo ? house === null || house === void 0 ? void 0 : house.photo.id : undefined,
            rentalFee: house.rentalFee,
            rentalPeriod: house.rentalPeriod,
            billsIncluded: house.billsIncluded,
            securityDeposit: house.securityDeposit,
            rooms: house.rooms,
            bathrooms: house.bathrooms,
            sharing: house.isSharing,
            hasCouncilWater: house.hasCouncilWater,
            hasBoreholeWater: house.hasBoreholeWater,
            hasElectricity: house.hasElectricity,
            hasBackupElectricity: house.hasBackupElectricity,
            status: house.status,
            address: isSubscribed ? create_address_dto_1.default.fromModel(house.address) : undefined,
            owner: isSubscribed ? user_dto_1.default.fromModel(house.owner) : undefined,
            hasParkingSpace: house.hasParkingSpace,
            isTilled: house.isTilled,
            isWalled: house.isWalled,
            hasOwnEntrance: house.hasOwnEntrance,
            hasCelling: house.hasCelling,
            hasBuiltInCupboards: house.hasBuiltInCupboards,
            isRequest: house.isRequest,
        };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, rentalFee: { required: true, type: () => Number }, photo: { required: false, type: () => Object }, rentalPeriod: { required: true, type: () => String }, billsIncluded: { required: true, type: () => Boolean }, securityDeposit: { required: true, type: () => Number }, rooms: { required: true, type: () => Number }, bathrooms: { required: true, type: () => Number }, sharing: { required: true, type: () => Boolean }, hasCouncilWater: { required: true, type: () => Boolean }, hasBoreholeWater: { required: true, type: () => Boolean }, hasElectricity: { required: true, type: () => Boolean }, hasBackupElectricity: { required: true, type: () => Boolean }, status: { required: true, type: () => String }, address: { required: true, type: () => require("./create-address.dto").default }, owner: { required: true, type: () => require("../../users/dto/user.dto").default }, hasParkingSpace: { required: true, type: () => Boolean }, isTilled: { required: true, type: () => Boolean }, isWalled: { required: true, type: () => Boolean }, hasOwnEntrance: { required: true, type: () => Boolean }, hasCelling: { required: true, type: () => Boolean }, hasBuiltInCupboards: { required: true, type: () => Boolean }, isRequest: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HouseDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HouseDto.prototype, "rentalFee", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], HouseDto.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HouseDto.prototype, "rentalPeriod", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "billsIncluded", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HouseDto.prototype, "securityDeposit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HouseDto.prototype, "rooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HouseDto.prototype, "bathrooms", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "sharing", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "hasCouncilWater", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "hasBoreholeWater", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "hasElectricity", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "hasBackupElectricity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HouseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", create_address_dto_1.default)
], HouseDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", user_dto_1.default)
], HouseDto.prototype, "owner", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "hasParkingSpace", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "isTilled", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "isWalled", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "hasOwnEntrance", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "hasCelling", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "hasBuiltInCupboards", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], HouseDto.prototype, "isRequest", void 0);
exports.default = HouseDto;
//# sourceMappingURL=house.dto.js.map