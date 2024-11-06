import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ObjectCard } from '../models/object-card.model';
import { CreateObjectCardDto } from './dto/create-object-card.dto';
import { UpdateObjectCardDto } from './dto/update-object-card.dto';
import { User } from 'src/models/user.model';
import { SpecialOffer } from 'src/models/special-offer.model';
import { UserSpecialOffers } from 'src/models/staging_tables/user-special-offers.model';
import { AddSpecialOfferDto } from './dto/add-special-offer.dto';
import { ObjectLevel } from 'src/models/object-level.model';
import { ObjectCategory } from 'src/models/object-category.model';
import { TransferGameCoinsDto } from './dto/transfer-game-coins.dto';

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
  ) {}

  async createObjectCard(createObjectCardDto: CreateObjectCardDto): Promise<ObjectCard> {
    return this.objectCardModel.create(createObjectCardDto);
  }

  async findAllObjectCards(): Promise<ObjectCard[]> {
    return this.objectCardModel.findAll();
  }

  async findObjectCardById(id: string): Promise<ObjectCard> {
    const objectCard = await this.objectCardModel.findByPk(id);
    if (!objectCard) {
      throw new NotFoundException('ObjectCard not found');
    }
    return objectCard;
  }

  
  async addSpecialOffer(addSpecialOfferDto: AddSpecialOfferDto): Promise<void> {
    const user = await this.userModel.findByPk(addSpecialOfferDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const specialOffer = await this.specialOfferModel.findByPk(addSpecialOfferDto.specialOfferId);
    if (!specialOffer) {
      throw new NotFoundException('SpecialOffer not found');
    }

    await this.userSpecialOffersModel.create({
      userId: user.id,
      specialOfferId: specialOffer.id,
    });
  }

  async transferGameCoins(transferGameCoinsDto: TransferGameCoinsDto): Promise<void> {
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
}
