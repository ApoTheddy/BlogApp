"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfig = void 0;
exports.TypeOrmConfig = {
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
//# sourceMappingURL=type_orm.config.js.map