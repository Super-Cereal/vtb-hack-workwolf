import { Module } from '@nestjs/common';
import { PartnerBannerService } from './partner-banner.service';
import { PartnerBannerController } from './partner-banner.controller';
import { PartnerBanner } from 'src/models/partner-banner.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ObjectCategory } from 'src/models/object-category.model';

@Module({
  imports: [
    SequelizeModule.forFeature([PartnerBanner,  ObjectCategory ]),
  ],
  controllers: [PartnerBannerController],
  providers: [PartnerBannerService],
})
export class PartnerBannerModule {}
