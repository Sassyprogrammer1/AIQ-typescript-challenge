import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {CustomExceptionFilter} from './http-exception.filter';
import {Logger} from '@nestjs/common'; // Import Logger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);
  app.useGlobalFilters(new CustomExceptionFilter(logger));
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
