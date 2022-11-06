"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Rently')
        .setDescription('Api for Malawi Accomodation Services')
        .setVersion('1.0')
        .addTag('Rently')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(9001);
}
bootstrap();
//# sourceMappingURL=main.js.map