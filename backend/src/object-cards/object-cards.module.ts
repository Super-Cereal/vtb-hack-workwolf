import { Module } from '@nestjs/common';
import { ObjectCardsController } from './object-cards.controller';
import { ObjectCardsService } from './object-cards.service';
import { ObjectCard } from 'src/models/object-card.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([ObjectCard])],
  controllers: [ObjectCardsController],
  providers: [ObjectCardsService],
})
export class ObjectCardModule {}
