import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ObjectCardModule } from './object-cards/object-cards.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PartnerBannerModule } from './partner-banner/partner-banner.module';
import { ObjectCategoryModule } from './object-category/object-category.module';
import { sequelizeConfig } from 'sequelize.config';
import { User } from './models/user.model';
import { SpecialOffer } from './models/special-offer.model';
import { UserSpecialOffers } from './models/staging_tables/user-special-offers.model';
import { UserFinancialLessons } from './models/staging_tables/user-financial-lessons.model';
import { ObjectCard } from './models/object-card.model';
import { ObjectLevel } from './models/object-level.model';
import { ObjectCategory } from './models/object-category.model';
import { FinancialLesson } from './models/financial-lesson.model';
import { PartnerBanner } from './models/partner-banner.model';
import { FinancialTest } from './models/financial-test.model';
import { Article } from './models/article.model';
import { Question } from './models/question.model';
import { OAuth2Module } from './open-api/auth/oauth2.module';
import { FinancialLessonModule } from './financial-lesson/financial-lesson.module';
import { AuthModule } from './auth/auth.module';
import { ObjectLevelModule } from './object-level/object-level.module';
import { SpecialOfferModule } from './special-offer/special-offer.module';
import { OpenApiModule } from './open-api/open-api.module';
import { FinancialTestModule } from './financial-test/financial-test.module';


@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([
      User,
      SpecialOffer,
      UserSpecialOffers,
      UserFinancialLessons,
      ObjectCard,
      ObjectLevel,
      ObjectCategory,
      FinancialLesson,
      PartnerBanner,
      FinancialTest,
      Article,
      Question,
    ]),
    OpenApiModule,
    UsersModule,
    ObjectCardModule,
    PartnerBannerModule,
    ObjectCategoryModule,
    OAuth2Module,
    FinancialLessonModule,
    AuthModule,
    ObjectLevelModule,
    SpecialOfferModule,
    FinancialTestModule,
  ],
})
export class AppModule {}
