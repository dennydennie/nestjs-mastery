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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const bycontract_1 = require("bycontract");
const postgresErrorCodes_enum_1 = require("../database/postgresErrorCodes.enum");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(registerDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        try {
            const createdUser = await this.usersService.create(Object.assign(Object.assign({}, registerDto), { password: hashedPassword }));
            createdUser.password = undefined;
            return createdUser;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === postgresErrorCodes_enum_1.default.UniqueViolation) {
                throw new common_1.HttpException('Email address has to be uniqie', common_1.HttpStatus.BAD_GATEWAY);
            }
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUser(loginDto) {
        try {
            const user = await this.usersService.findByEmail(loginDto.email);
            const isPasswordMatching = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordMatching) {
                throw new common_1.HttpException('Invalid login details', common_1.HttpStatus.BAD_REQUEST);
            }
            user.password = undefined;
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('Invalid login details', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getCookieWithJwtToken(userId) {
        const payload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication =${token}; httpOnly: Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }
    getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
    async resetPassword(email, password, token) {
        (0, bycontract_1.validate)([email, password, token], ['string', 'string', 'string']);
        await this.usersService.resetPassword(email, password, token);
    }
    async verifyEmail(email, token) {
        (0, bycontract_1.validate)([email, token], ['string', 'string']);
        return await this.usersService.verifyEmail(email, token);
    }
    async forgotPassword(email) {
        (0, bycontract_1.validate)([email], ['string']);
        this.usersService.forgotPassword(email);
    }
    async decode(token) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            });
            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new common_1.BadRequestException();
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.name) === 'TokenExpiredError') {
                throw new common_1.BadRequestException('EMail confirmation token expired');
            }
            throw new common_1.BadRequestException('Bad confirmation token');
        }
    }
    async confirm(email) {
        const user = await this.usersService.findByEmail(email);
        if (user.isEmailConfirmed) {
            throw new common_1.BadRequestException('Email already confimed');
        }
    }
    async resend(userId) {
        const user = await this.usersService.getById(userId);
        if (user.isEmailConfirmed) {
            throw new common_1.BadRequestException('Email already confirmed');
        }
        const token = '1231112mans';
        await this.usersService.verifyEmail(user.email, token);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map