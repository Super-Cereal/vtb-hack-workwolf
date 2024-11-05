// object-card.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ObjectCard } from '../models/object-card.model';
import { CreateObjectCardDto } from './dto/create-object-card.dto';
import { UpdateObjectCardDto } from './dto/update-object-card.dto';

@Injectable()
export class ObjectCardsService {
  constructor(
    @InjectModel(ObjectCard)
    private objectCardModel: typeof ObjectCard,
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
