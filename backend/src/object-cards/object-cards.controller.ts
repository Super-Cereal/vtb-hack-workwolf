import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ObjectCardsService } from './object-cards.service';
import { CreateObjectCardDto } from './dto/create-object-card.dto';
import { UpdateObjectCardDto } from './dto/update-object-card.dto';
import { AddSpecialOfferDto } from './dto/add-special-offer.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('ObjectCards')
@Controller('object-cards')
export class ObjectCardsController {
  constructor(private readonly objectCardsService: ObjectCardsService) {}

  @ApiOperation({ summary: 'Create a new ObjectCard' })
  @ApiResponse({ status: 201, description: 'The ObjectCard has been successfully created.' })
  @ApiBody({ type: CreateObjectCardDto })
  @Post()
  async createObjectCard(@Body() createObjectCardDto: CreateObjectCardDto) {
    return this.objectCardsService.createObjectCard(createObjectCardDto);
  }

  @ApiOperation({ summary: 'Get all ObjectCards' })
  @ApiResponse({ status: 200, description: 'The list of ObjectCards.' })
  @Get()
  async findAllObjectCards() {
    return this.objectCardsService.findAllObjectCards();
  }

  @ApiOperation({ summary: 'Get ObjectCards by User ID' })
  @ApiResponse({ status: 200, description: 'The list of ObjectCards for the specified user.' })
  @Get('user/:userId')
  async findObjectCardsByUserId(@Param('userId') userId: string) {
    return this.objectCardsService.findObjectCardsByUserId(userId);
  }

  @ApiOperation({ summary: 'Get ObjectCard by ID' })
  @ApiResponse({ status: 200, description: 'The ObjectCard with the specified ID.' })
  @Get(':id')
  async findObjectCardById(@Param('id') id: string) {
    return this.objectCardsService.findObjectCardById(id);
  }

  @ApiOperation({ summary: 'Update an ObjectCard' })
  @ApiResponse({ status: 200, description: 'The ObjectCard has been successfully updated.' })
  @ApiBody({ type: UpdateObjectCardDto })
  @Put(':id')
  async updateObjectCard(
    @Param('id') id: string,
    @Body() updateObjectCardDto: UpdateObjectCardDto,
  ) {
    return this.objectCardsService.updateObjectCard(id, updateObjectCardDto);
  }

  @ApiOperation({ summary: 'Delete an ObjectCard' })
  @ApiResponse({ status: 200, description: 'The ObjectCard has been successfully deleted.' })
  @Delete(':id')
  async deleteObjectCard(@Param('id') id: string) {
    return this.objectCardsService.deleteObjectCard(id);
  }

  @ApiOperation({ summary: 'Add a special offer to a user' })
  @ApiResponse({ status: 201, description: 'The special offer has been successfully added.' })
  @ApiBody({ type: AddSpecialOfferDto })
  @Post('special-offers')
  async addSpecialOffer(@Body() addSpecialOfferDto: AddSpecialOfferDto): Promise<void> {
    return this.objectCardsService.addSpecialOffer(addSpecialOfferDto);
  }
}
