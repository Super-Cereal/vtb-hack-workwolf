import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SpecialOfferService } from './special-offer.service';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SpecialOffer } from 'src/models/special-offer.model';
import { CreateManySpecialOffersDto, CreateSpecialOfferDto } from './dto/create-special-offer.dto';

@ApiTags('special-offers')
@Controller('special-offers')
export class SpecialOfferController {
  constructor(private readonly specialOfferService: SpecialOfferService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new special offer' })
  @ApiResponse({ status: 201, type: SpecialOffer })
  create(@Body() createSpecialOfferDto: CreateSpecialOfferDto): Promise<SpecialOffer> {
    return this.specialOfferService.create(createSpecialOfferDto);
  }

  @Post('many')
  @ApiOperation({ summary: 'Create multiple special offers' })
  @ApiResponse({ status: 201, type: [SpecialOffer] })
  createMany(
    @Body() createManySpecialOffersDto: CreateManySpecialOffersDto,
  ): Promise<SpecialOffer[]> {
    return this.specialOfferService.createMany(createManySpecialOffersDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all special offers' })
  @ApiResponse({ status: 200, type: [SpecialOffer] })
  findAll(): Promise<SpecialOffer[]> {
    return this.specialOfferService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a special offer by ID' })
  @ApiResponse({ status: 200, type: SpecialOffer })
  findOne(@Param('id') id: string): Promise<SpecialOffer> {
    return this.specialOfferService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a special offer by ID' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string): Promise<void> {
    return this.specialOfferService.remove(id);
  }
}
