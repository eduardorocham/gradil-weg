import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configurarApp } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configurarApp(app);
  await app.listen(3000);
}
bootstrap();
