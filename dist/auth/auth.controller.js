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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const confirm_email_dto_1 = require("./dto/confirm-email.dto");
const register_dto_1 = require("./dto/register.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const constants_1 = require("./strategies/constants");
const local_guard_1 = require("../guards/local.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async login(request, response) {
        const { user } = request;
        const cookie = this.authService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }
    async logout(request, response) {
        var _a;
        response.setHeader('Set-Cookie', await ((_a = this === null || this === void 0 ? void 0 : this.authService) === null || _a === void 0 ? void 0 : _a.getCookieForLogOut()));
        return response.sendStatus(200);
    }
    authenticate(request) {
        const { user } = request;
        user.password = undefined;
    }
    async resetPassword(resetPasswordDto) {
        const { email, password, token } = resetPasswordDto;
        await this.authService.resetPassword(email, password, token);
    }
    async forgotPassword(email) {
        await this.authService.forgotPassword(email);
    }
    async verify(verifyEmailDto) {
        return await this.authService.verifyEmail(verifyEmailDto.email);
    }
    async markEmail(token) {
        return await this.authService.markEmail(token);
    }
    async resend(request) {
        await this.authService.resend(request.user.id);
    }
};
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a user',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(local_guard_1.LocalAuthGuard),
    (0, constants_1.Public)(),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'login a user',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({
        summary: 'logout a user',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Authenticate a user',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "authenticate", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    (0, constants_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Reset a user password, by passing a secret token from email',
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('/forgot-password'),
    (0, constants_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Send a forgot password email for a login' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/verify'),
    (0, constants_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm email address' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_email_dto_1.ConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('/mark-email'),
    (0, constants_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm email address' }),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "markEmail", null);
__decorate([
    (0, common_1.Post)('/resend-verify-email'),
    (0, constants_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resend", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map