"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const constantes_1 = require("./constantes");
const common_1 = require("@nestjs/common");
const express = require("express");
const swagger_1 = require("@nestjs/swagger");
const nodeCrypto = require("crypto");
if (!global.crypto?.randomUUID) {
    global.crypto.randomUUID = nodeCrypto.randomUUID;
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transformOptions: {
            enableImplicitConversion: true,
        },
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const reflector = app.get(core_1.Reflector);
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(reflector));
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3000;
    app.enableCors(constantes_1.CORS);
    app.setGlobalPrefix('apiFtx');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('FTX API')
        .setDescription('Aplicacion de gestion para personal Trainner y sus clientes')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.use('/uploads', express.static('uploads'));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map