import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ObjectCardModule } from './object-cards/object-cards.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PartnerBannerModule } from './partner-banner/partner-banner.module';
import { ObjectCategoryModule } from './object-category/object-category.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'vtbhakaton',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    ObjectCardModule,
    PartnerBannerModule,
    ObjectCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
