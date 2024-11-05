import { Module } from '@nestjs/common';
import { PartnerBannerService } from './partner-banner.service';
import { PartnerBannerController } from './partner-banner.controller';

@Module({
  controllers: [PartnerBannerController],
  providers: [PartnerBannerService],
})
export class PartnerBannerModule {}