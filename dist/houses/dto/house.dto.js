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
const class_validator_1 = require("class-validator");
const create_address_dto_1 = require("../../addresses/dto/create-address.dto");
const user_dto_1 = require("../../users/dto/user.dto");
class HouseDto {
    static async fromModel(house) {
        return {
            id: house.id,
            rentalFee: house.rentalFee,
            rentalPeriod: house.rentalPeriod,
            billsIncluded: house.billsIncluded,
            securityDeposit: house.securityDeposit,
            rooms: house.rooms,
            bathrooms: house.bathrooms,
            sharing: house.sharing,
            hasCouncilWater: house.hasCouncilWater,
            hasBoreholeWater: house.hasBoreholeWater,
            hasElectricity: house.hasElectricity,
            hasBackupElectricity: house.hasBackupElectricity,
            status: house.status,
            address: await create_address_dto_1.default.fromModel(house.address),
            owner: await user_dto_1.default.fromModel(house.owner),
        };
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
exports.default = HouseDto;
//# sourceMappingURL=house.dto.js.map