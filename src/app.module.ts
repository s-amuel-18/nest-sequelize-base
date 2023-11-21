import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';

@Module({
  providers: [],
  imports: [
    // * Configuración principal para variables de entorno
    ConfigModule.forRoot(),

    // * Configuración base de datos
    SequelizeModule.forRoot({
      dialect: 'postgres',
      dialectOptions: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: process.env.DB_LOGGING == 'true' ? true : false,
      synchronize: false,
      autoLoadModels: false,
      models: [User],
    }),
    UserModule,

    AuthModule,

    CommonModule,

    ProductsModule,
  ],
  controllers: [],
})
export class AppModule {
  constructor() {}
}
