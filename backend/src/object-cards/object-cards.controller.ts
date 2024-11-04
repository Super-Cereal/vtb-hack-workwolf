import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ObjectCardsService } from './object-cards.service';
import { CreateObjectCardDto } from './dto/create-object-card.dto';
import { UpdateObjectCardDto } from './dto/update-object-card.dto';

@Controller('object-cards')
export class ObjectCardsController {
  constructor(private readonly objectCardService: ObjectCardsService) {}

  @Post()
  async createObjectCard(@Body() createObjectCardDto: CreateObjectCardDto) {
    return this.objectCardService.createObjectCard(createObjectCardDto);
  }

  @Get()
  async findAllObjectCards() {
    return this.objectCardService.findAllObjectCards();
  }

  @Get(':id')
  async findObjectCardById(@Param('id') id: string) {
    return this.objectCardService.findObjectCardById(id);
  }

  @Put(':id')
  async updateObjectCard(@Param('id') id: string, @Body() updateObjectCardDto: UpdateObjectCardDto) {
    return this.objectCardService.updateObjectCard(id, updateObjectCardDto);
  }

  @Delete(':id')
  async deleteObjectCard(@Param('id') id: string) {
    return this.objectCardService.deleteObjectCard(id);
  }
}
