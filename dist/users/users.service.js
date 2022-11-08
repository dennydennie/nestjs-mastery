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
exports.randomString = exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const email_service_1 = require("../email/email.service");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository, configService, emailService, jwtService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const newUser = await this.userRepository.create(createUserDto);
        if (newUser) {
            await this.userRepository.save(newUser);
            await this.verifyEmail(newUser.email);
            return newUser;
        }
        throw new common_1.HttpException('Failed to add new user', common_1.HttpStatus.BAD_REQUEST);
    }
    findAll() {
        return this.userRepository.find();
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOneBy({
            email,
        });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async getById(userId) {
        const user = await this.userRepository.findOneBy({
            id: userId,
        });
        if (user) {
            user.password = undefined;
            return user;
        }
        throw new common_1.HttpException('User does not exist.', common_1.HttpStatus.NOT_FOUND);
    }
    async resetPassword(email, password, token) {
        const user = await this.userRepository.findOneBy({
            email,
            forgotPasswordToken: token,
        });
        if (!user) {
            throw new common_1.InternalServerErrorException();
        }
        user.password = await bcrypt.hash(password, 10);
        user.forgotPasswordToken = null;
        await this.userRepository.save(user);
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findOneBy({
            email,
        });
        if (!user) {
            return;
        }
        user.forgotPasswordToken = randomString();
        await this.userRepository.save(user);
        const token = this.jwtService.sign({
            email: email,
            forgotPasswordToken: user.forgotPasswordToken,
        }, { secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET') });
        const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}reset-password?token=${token}`;
        const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
        return this.emailService.sendMail(email, 'Reset Account', text, url);
    }
    async verifyEmail(email) {
        const user = await this.userRepository.findOneBy({
            email,
        });
        if (!user || !!user.isEmailConfirmed) {
            return;
        }
        if (user && !!user.isEmailConfirmed) {
            throw new common_1.BadRequestException('Email already confimed');
        }
        const token = this.jwtService.sign({
            email: email,
            verifyEmailToken: user.verifyEmailToken,
        }, { secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET') });
        const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}mark-email?token=${token}`;
        const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
        return this.emailService.sendMail(email, 'On Boarding', text, url);
    }
    async markEmail(token) {
        const decoded = this.jwtService.decode(token, this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'));
        const email = decoded.email;
        const user = await this.userRepository.findOneBy({
            email,
        });
        if (user && !user.isEmailConfirmed) {
            const updateResponse = await this.userRepository.update({
                id: user.id,
            }, {
                verifyEmailToken: null,
                isEmailConfirmed: true,
            });
            if (updateResponse.affected === 1)
                return common_1.HttpStatus.CREATED;
        }
        throw new common_1.HttpException('Email has already been verified', common_1.HttpStatus.BAD_REQUEST);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        email_service_1.EmailService,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
function randomString() {
    let result = '';
    const length = 48;
    const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var dictionaryLength = dictionary.length;
    for (var i = 0; i < length; i++) {
        result += dictionary.charAt(Math.floor(Math.random() * dictionaryLength));
    }
    return result;
}
exports.randomString = randomString;
//# sourceMappingURL=users.service.js.map