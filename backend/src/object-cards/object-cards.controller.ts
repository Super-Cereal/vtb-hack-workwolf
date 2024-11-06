import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ObjectCardsService } from './object-cards.service';
import { CreateObjectCardDto } from './dto/create-object-card.dto';
import { UpdateObjectCardDto } from './dto/update-object-card.dto';
import { AddSpecialOfferDto } from './dto/add-special-offer.dto';
import { TransferGameCoinsDto } from './dto/transfer-game-coins.dto';

@Controller('object-cards')
export class ObjectCardsController {
  constructor(private readonly objectCardsService: ObjectCardsService) {}

  @Post()
  async createObjectCard(@Body() createObjectCardDto: CreateObjectCardDto) {
    return this.objectCardsService.createObjectCard(createObjectCardDto);
  }

  @Get()
  async findAllObjectCards() {
    return this.objectCardsService.findAllObjectCards();
  }

  @Get(':id')
  async findObjectCardById(@Param('id') id: string) {
    return this.objectCardsService.findObjectCardById(id);
  }

  @Put(':id')
  async updateObjectCard(
    @Param('id') id: string,
    @Body() updateObjectCardDto: UpdateObjectCardDto,
  ) {
    return this.objectCardsService.updateObjectCard(id, updateObjectCardDto);
  }

  @Delete(':id')
  async deleteObjectCard(@Param('id') id: string) {
    return this.objectCardsService.deleteObjectCard(id);
  }

  @Post('special-offers')
  async addSpecialOffer(@Body() addSpecialOfferDto: AddSpecialOfferDto): Promise<void> {
    return this.objectCardsService.addSpecialOffer(addSpecialOfferDto);
  }

  @Post('transfer-coins')
  async transferGameCoins(@Body() transferGameCoinsDto: TransferGameCoinsDto): Promise<void> {
    return this.objectCardsService.transferGameCoins(transferGameCoinsDto);
  }
}
