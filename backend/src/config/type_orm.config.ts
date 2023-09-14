import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  database: 'blog_app',
  synchronize: true,
  autoLoadEntities: true,
  username: 'sa',
  password: '5ql@s3cur3_pa55',
  extra: {
    trustServerCertificate: true,
    encrypt: true,
  },
};
