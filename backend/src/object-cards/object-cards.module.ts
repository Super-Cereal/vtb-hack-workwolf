import { Module } from '@nestjs/common';
import { ObjectCardsController } from './object-cards.controller';
import { ObjectCardsService } from './object-cards.service';
import { ObjectCard } from 'src/models/object-card.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { SpecialOffer } from 'src/models/special-offer.model';
import { UserSpecialOffers } from 'src/models/staging_tables/user-special-offers.model';
import { ObjectLevel } from 'src/models/object-level.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ObjectCard, User, SpecialOffer, UserSpecialOffers, ObjectLevel]),
  ],
  controllers: [ObjectCardsController],
  providers: [ObjectCardsService],
  exports: [ObjectCardsService],
})
export class ObjectCardModule {}
