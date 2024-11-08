import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpecialOfferService } from './special-offer.service';
import { SpecialOfferController } from './special-offer.controller';
import { SpecialOffer } from 'src/models/special-offer.model';

@Module({
  imports: [SequelizeModule.forFeature([SpecialOffer])],
  providers: [SpecialOfferService],
  controllers: [SpecialOfferController],
})
export class SpecialOfferModule {}
