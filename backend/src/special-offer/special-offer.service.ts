import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SpecialOffer } from 'src/models/special-offer.model';
import { CreateManySpecialOffersDto, CreateSpecialOfferDto } from './dto/create-special-offer.dto';

@Injectable()
export class SpecialOfferService {
  constructor(
    @InjectModel(SpecialOffer)
    private specialOfferModel: typeof SpecialOffer,
  ) {}

  async create(createSpecialOfferDto: CreateSpecialOfferDto): Promise<SpecialOffer> {
    return this.specialOfferModel.create(createSpecialOfferDto);
  }

  async createMany(
    createManySpecialOffersDto: CreateManySpecialOffersDto,
  ): Promise<SpecialOffer[]> {
    return this.specialOfferModel.bulkCreate(createManySpecialOffersDto.specialOffers);
  }

  async findAll(): Promise<SpecialOffer[]> {
    return this.specialOfferModel.findAll();
  }

  async findOne(id: string): Promise<SpecialOffer> {
    return this.specialOfferModel.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const specialOffer = await this.findOne(id);
    await specialOffer.destroy();
  }
}
