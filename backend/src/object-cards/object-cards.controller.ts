import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ObjectCardsService } from './object-cards.service';
import { CreateObjectCardDto } from './dto/create-object-card.dto';
import { UpdateObjectCardDto } from './dto/update-object-card.dto';
import { AddSpecialOfferDto } from './dto/add-special-offer.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LevelUpObjectCardDto } from './dto/level-up-obj-card.dto';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async findObjectCardsByUserId(@Req() request) {
    const userId = request.user.id; 
    return this.objectCardsService.findObjectCardsByUserId(userId);
  }

  @ApiOperation({ summary: 'Get ObjectCard by ID' })
  @ApiResponse({ status: 200, description: 'The ObjectCard with the specified ID.' })
  @Get('getone/:id')
  async findObjectCardById(@Param('id') id: string) {
    return this.objectCardsService.findObjectCardById(id);
  }

  @ApiOperation({ summary: 'Update an ObjectCard' })
  @ApiResponse({ status: 200, description: 'The ObjectCard has been successfully updated.' })
  @ApiBody({ type: UpdateObjectCardDto })
  @Put(':id')
  async updateObjectCard(
    @Param('update/id') id: string,
    @Body() updateObjectCardDto: UpdateObjectCardDto,
  ) {
    return this.objectCardsService.updateObjectCard(id, updateObjectCardDto);
  }

  @ApiOperation({ summary: 'Delete an ObjectCard' })
  @ApiResponse({ status: 200, description: 'The ObjectCard has been successfully deleted.' })
  @Delete('delete/:id')
  async deleteObjectCard(@Param('id') id: string) {
    return this.objectCardsService.deleteObjectCard(id);
  }

  @ApiOperation({ summary: 'Add a special offer to a user' })
  @ApiResponse({ status: 201, description: 'The special offer has been successfully added.' })
  @ApiBody({ type: AddSpecialOfferDto })
  @UseGuards(AuthGuard('jwt'))
  @Post('special-offers')
  async addSpecialOffer(@Req() request, @Body() specialOfferId: string): Promise<void> {
    const userId = request.user.id; 
    console.log(userId);
    
    return this.objectCardsService.addSpecialOffer({userId, specialOfferId});
  }

  @ApiOperation({ summary: 'Level up object card' })
  @ApiResponse({ status: 200, description: 'The object card has been successfully leveled up.' })
  @UseGuards(AuthGuard('jwt'))
  @Post('level-up')
  async levelUpObjectCard(@Req() request, @Body() objectCardId: string) {
    const userId = request.user.id; 
    return this.objectCardsService.levelUpObjectCard({userId: userId, objectCardId: objectCardId });
  }
}
