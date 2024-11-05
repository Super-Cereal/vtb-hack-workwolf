import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ObjectCategory } from 'src/models/object-category.model';
import { ObjectLevel } from 'src/models/object-level.model';
import { ObjectCard } from 'src/models/object-card.model';
import { ObjectCardsService } from 'src/object-cards/object-cards.service';

@Module({
  imports: [SequelizeModule.forFeature([User, ObjectCategory, ObjectLevel, ObjectCard])],
  controllers: [UsersController],
  providers: [UsersService, ObjectCardsService],
})
export class UsersModule {}
