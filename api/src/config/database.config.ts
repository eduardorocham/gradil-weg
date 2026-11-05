import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'src/config/gradil.sqlite',
  autoLoadEntities: true,
  synchronize: true,
};
