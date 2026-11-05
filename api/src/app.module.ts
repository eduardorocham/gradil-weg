import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), PedidosModule],
})
export class AppModule {}
