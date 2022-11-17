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
const abstract_entity_1 = require("../../database/entities/abstract-entity");
const address_entity_1 = require("./address.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const photo_entity_1 = require("./photo.entity");
let House = class House extends abstract_entity_1.default {
};
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.default, { eager: true, cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.default)
], House.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, (owner) => owner.houses, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", user_entity_1.default)
], House.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => photo_entity_1.default, {
        eager: true,
        cascade: true,
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", photo_entity_1.default)
], House.prototype, "photo", void 0);
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
], House.prototype, "isSharing", void 0);
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
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], House.prototype, "hasBackupElectricity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], House.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], House.prototype, "hasParkingSpace", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], House.prototype, "isTilled", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], House.prototype, "isWalled", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], House.prototype, "hasOwnEntrance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], House.prototype, "hasCelling", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], House.prototype, "hasBuiltInCupboards", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], House.prototype, "isRequest", void 0);
House = __decorate([
    (0, typeorm_1.Entity)()
], House);
exports.default = House;
//# sourceMappingURL=house.entity.js.map