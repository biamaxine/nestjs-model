import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';

import { DESCRIPTION, TITLE, VERSION } from './app.constants';
import { AppModule } from './app.module';
import { ClearCacheMiddleware } from './shared/middlewares/clear-cache.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new ClearCacheMiddleware().use);

  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(VERSION)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(morgan('dev'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
