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
exports.House = void 0;
const addresses_entity_1 = require("../../addresses/entities/addresses.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let House = class House {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], House.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => addresses_entity_1.Address, { eager: true, cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", addresses_entity_1.Address)
], House.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, (owner) => owner.houses, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", user_entity_1.default)
], House.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], House.prototype, "rentalFee", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], House.prototype, "rentalPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], House.prototype, "billsIncluded", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], House.prototype, "securityDeposit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], House.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], House.prototype, "bathrooms", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], House.prototype, "sharing", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], House.prototype, "hasCouncilWater", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], House.prototype, "hasBoreholeWater", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], House.prototype, "hasElectricity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], House.prototype, "hasBackupElectricity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], House.prototype, "status", void 0);
House = __decorate([
    (0, typeorm_1.Entity)()
], House);
exports.House = House;
//# sourceMappingURL=house.entity.js.map