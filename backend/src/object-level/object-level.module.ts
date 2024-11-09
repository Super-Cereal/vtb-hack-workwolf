import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ObjectLevelService } from './object-level.service';
import { ObjectLevelController } from './object-level.controller';
import { ObjectLevel } from 'src/models/object-level.model';
import { SpecialOffer } from 'src/models/special-offer.model';

@Module({
  imports: [SequelizeModule.forFeature([ObjectLevel, SpecialOffer])],
  providers: [ObjectLevelService],
  controllers: [ObjectLevelController],
})
export class ObjectLevelModule {}
