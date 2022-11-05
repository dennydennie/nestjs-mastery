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
exports.CreateHouseDto = void 0;
const class_validator_1 = require("class-validator");
const create_address_dto_1 = require("../../addresses/dto/create-address.dto");
class CreateHouseDto {
}
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", create_address_dto_1.default)
], CreateHouseDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateHouseDto.prototype, "rentalFee", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHouseDto.prototype, "rentalPeriod", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateHouseDto.prototype, "securityDeposit", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHouseDto.prototype, "billsIncluded", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateHouseDto.prototype, "rooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateHouseDto.prototype, "bathrooms", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHouseDto.prototype, "sharing", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHouseDto.prototype, "hasCouncilWater", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHouseDto.prototype, "hasBoreholeWater", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHouseDto.prototype, "hasElectricity", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHouseDto.prototype, "hasBackupElectricity", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", String)
], CreateHouseDto.prototype, "status", void 0);
exports.CreateHouseDto = CreateHouseDto;
//# sourceMappingURL=create-house.dto.js.map