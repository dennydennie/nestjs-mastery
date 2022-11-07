"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const Joi = require("@hapi/joi");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const database_module_1 = require("./database/database.module");
const houses_module_1 = require("./houses/houses.module");
const users_module_1 = require("./users/users.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
const email_service_1 = require("./email/email.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    POSTGRES_HOST: Joi.string().required(),
                    POSTGRES_DATABASE: Joi.string().required(),
                    POSTGRES_PORT: Joi.number().required(),
                    POSTGRES_USERNAME: Joi.string().required(),
                    POSTGRES_PASSWORD: Joi.string().required(),
                    PORT: Joi.number().required(),
                    JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
                    JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
                    EMAIL_CONFIRMATION_URL: Joi.string().required(),
                    EMAIL_SERVICE: Joi.string().required(),
                    EMAIL_USER: Joi.string().required(),
                    EMAIL_PASSWORD: Joi.string().required(),
                }),
            }),
            auth_module_1.AuthModule,
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            houses_module_1.HousesModule,
            subscriptions_module_1.SubscriptionsModule,
        ],
        providers: [jwt_1.JwtService, auth_service_1.AuthService, email_service_1.EmailService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map