import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './log';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
    cors: {
      origin: '*',
    },
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Phone API')
    .setDescription('The phone API description')
    .setVersion('1.0')
    .addTag('phone')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(8000);
}
bootstrap();
