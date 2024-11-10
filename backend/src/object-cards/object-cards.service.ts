import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ObjectCard } from '../models/object-card.model';
import { CreateObjectCardDto } from './dto/create-object-card.dto';
import { UpdateObjectCardDto } from './dto/update-object-card.dto';
import { User } from 'src/models/user.model';
import { SpecialOffer } from 'src/models/special-offer.model';
import { UserSpecialOffers } from 'src/models/staging_tables/user-special-offers.model';
import { AddorRemoveSpecialOfferDto } from './dto/add-special-offer.dto';
import { ObjectLevel } from 'src/models/object-level.model';
import { LevelUpObjectCardDto } from './dto/level-up-obj-card.dto';
import { ObjectCategory } from 'src/models/object-category.model';
import { firstValueFrom } from 'rxjs';
import type { Transaction } from './types';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ObjectCardsService {
  constructor(
    @InjectModel(ObjectCard)
    private objectCardModel: typeof ObjectCard,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(SpecialOffer)
    private specialOfferModel: typeof SpecialOffer,
    @InjectModel(UserSpecialOffers)
    private userSpecialOffersModel: typeof UserSpecialOffers,
    @InjectModel(ObjectLevel)
    private objectLevelModel: typeof ObjectLevel,

    private readonly httpService: HttpService,
  ) {}

  async createObjectCard(createObjectCardDto: CreateObjectCardDto): Promise<ObjectCard> {
    return this.objectCardModel.create(createObjectCardDto);
  }

  async findAllObjectCards(): Promise<ObjectCard[]> {
    return this.objectCardModel.findAll();
  }

  async findObjectCardsByUserId(userId: string): Promise<ObjectCard[]> {
    const objectCards = await this.objectCardModel.findAll({
      where: { userId: userId },
      include: [
        {
          model: ObjectCategory,
          as: 'objectCategory',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: ObjectLevel,
          as: 'currentLevel',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['currentLevelId', 'objectCategoryId', 'createdAt', 'updatedAt', 'userId'],
      },
    });

    if (objectCards.length === 0) {
      throw new NotFoundException('ObjectCards not found');
    }

    /** Обновляем прогресс по всем карточкам */
    const recalculatedObjectCards = await this.recalculateProgess(userId, objectCards);

    return recalculatedObjectCards;
  }

  async findObjectCardById(id: string): Promise<ObjectCard> {
    const objectCard = await this.objectCardModel.findByPk(id, {
      include: [
        {
          model: ObjectCategory,
          as: 'objectCategory',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: ObjectLevel,
          as: 'currentLevel',
          include: [
            {
              model: SpecialOffer,
              as: 'specialOffers',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'ObjectLevelId'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'objectId'],
          },
        },
      ],
      attributes: {
        exclude: ['currentLevelId', 'objectCategoryId', 'createdAt', 'updatedAt', 'userId'],
      },
    });

    if (!objectCard) {
      throw new NotFoundException('ObjectCard not found');
    }

    return objectCard;
  }

  async addSpecialOffer(addSpecialOfferDto: AddorRemoveSpecialOfferDto): Promise<void> {
    const user = await this.userModel.findOne({
      where: { id: addSpecialOfferDto.userId },
    });
    console.log(user);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const specialOffer = await this.specialOfferModel.findOne({
      where: { id: addSpecialOfferDto.specialOfferId },
    });
    if (!specialOffer) {
      throw new NotFoundException('SpecialOffer not found');
    }

    await this.userSpecialOffersModel.create({
      userId: user.id,
      specialOfferId: specialOffer.id,
    });
  }

  async removeSpecialOffer(removeSpecialOfferDto: AddorRemoveSpecialOfferDto): Promise<void> {
    const user = await this.userModel.findOne({
      where: { id: removeSpecialOfferDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const specialOffer = await this.specialOfferModel.findOne({
      where: { id: removeSpecialOfferDto.specialOfferId },
    });

    if (!specialOffer) {
      throw new NotFoundException('SpecialOffer not found');
    }

    const userSpecialOffer = await this.userSpecialOffersModel.findOne({
      where: { userId: user.id, specialOfferId: specialOffer.id },
    });

    if (!userSpecialOffer) {
      throw new HttpException('User does not have this special offer', HttpStatus.OK);
    }

    await this.userSpecialOffersModel.destroy({
      where: { userId: user.id, specialOfferId: specialOffer.id },
    });
  }

  async updateObjectCard(
    id: string,
    updateObjectCardDto: UpdateObjectCardDto,
  ): Promise<ObjectCard> {
    const [updatedRows] = await this.objectCardModel.update(updateObjectCardDto, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      throw new NotFoundException('ObjectCard not found');
    }

    return this.findObjectCardById(id);
  }

  async deleteObjectCard(id: string): Promise<void> {
    const deletedRows = await this.objectCardModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new NotFoundException('ObjectCard not found');
    }
  }

  async levelUpObjectCard(levelUpObjectCardDto: LevelUpObjectCardDto): Promise<void> {
    const user = await this.userModel.findByPk(levelUpObjectCardDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const objectCard = await this.objectCardModel.findByPk(levelUpObjectCardDto.objectCardId);
    if (!objectCard) {
      throw new NotFoundException('ObjectCard not found');
    }

    const currentLevel = await this.objectLevelModel.findByPk(objectCard.currentLevelId);
    if (!currentLevel) {
      throw new NotFoundException('Current level not found');
    }

    if (objectCard.progress < currentLevel.nextLevelCost) {
      throw new BadRequestException('Insufficient progress to level up');
    }

    // FIXME: У пользователя нет валюты
    // if (user.gameCoins < currentLevel.gamecoins) {
    //   throw new BadRequestException('Insufficient game coins to level up');
    // }

    const nextLevel = await this.objectLevelModel.findOne({
      where: {
        objectId: currentLevel.objectId,
        level: currentLevel.level + 1,
      },
    });

    if (!nextLevel) {
      throw new NotFoundException('Next level not found');
    }

    // FIXME: У пользователя нет валюты
    // user.gameCoins -= currentLevel.gamecoins;
    await user.save();

    objectCard.currentLevelId = nextLevel.id;
    objectCard.progress = 0;
    await objectCard.save();
  }

  /** Обновить прогресс по карточке обьекта для пользователя */
  async recalculateProgess(userId: string, objectCards: ObjectCard[]) {
    const transactions = (
      (
        await firstValueFrom(
          this.httpService.get(`http://localhost:3001/api/transactions/${userId}`),
        )
      ).data as Transaction[]
    ).filter(({ type }) => type === 'out');

    for (const objectCard of objectCards) {
      const transactionsByCategory = transactions.filter(
        ({ category }) => category.name === objectCard.objectCategory.category,
      );

      const transactionsSum = transactionsByCategory.reduce((acc, { value }) => acc + value, 0);
      const maxProgress = objectCard.currentLevel.nextLevelCost;

      objectCard.progress = Math.min(maxProgress, objectCard.progress + transactionsSum);
      await objectCard.save();
    }

    return objectCards;
  }

  /* async transferGameCoins(transferGameCoinsDto: TransferGameCoinsDto): Promise<void> {
    const user = await this.userModel.findByPk(transferGameCoinsDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const objectCard = await this.objectCardModel.findByPk(transferGameCoinsDto.objectCardId);
    if (!objectCard) {
      throw new NotFoundException('ObjectCard not found');
    }

    if (objectCard.weeklyTransferredCoins + transferGameCoinsDto.amount > 400) {
      throw new BadRequestException('Cannot transfer more than 400 coins per week');
    }

    if (user.gameCoins < transferGameCoinsDto.amount) {
      throw new BadRequestException('Insufficient game coins');
    }

    user.gameCoins -= transferGameCoinsDto.amount;
    await user.save();

    objectCard.weeklyTransferredCoins += transferGameCoinsDto.amount;
    objectCard.progress += transferGameCoinsDto.amount;
    await objectCard.save();

    const currentLevel = await this.objectLevelModel.findByPk(objectCard.currentLevelId);
    if (objectCard.progress >= currentLevel.nextLevelCost) {
      const nextLevel = await this.objectLevelModel.findOne({
        where: {
          objectId: currentLevel.objectId,
          level: currentLevel.level + 1,
        },
      });

      if (nextLevel) {
        objectCard.currentLevelId = nextLevel.id;
        objectCard.progress = 0;
        await objectCard.save();
      }
    }
  } */
}
