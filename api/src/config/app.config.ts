import { INestApplication, ValidationPipe } from '@nestjs/common';

export function configurarApp(app: INestApplication) {
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
}
