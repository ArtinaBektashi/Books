import { NestFactory } from '@nestjs/core';
require('dotenv').config();
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const frontendUrl = configService.get('FRONTEND_URL');
 
  app.enableCors({
    origin: frontendUrl,
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
