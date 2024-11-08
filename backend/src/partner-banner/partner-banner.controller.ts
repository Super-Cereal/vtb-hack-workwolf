import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PartnerBannerService } from './partner-banner.service';
import { CreatePartnerBannerDto } from './dto/create-partner-banner.dto';
import { UpdatePartnerBannerDto } from './dto/update-partner-banner.dto';

@ApiTags('partner-banners')
@Controller('partner-banners')
export class PartnerBannerController {
  constructor(private readonly partnerBannerService: PartnerBannerService) {}

  @ApiOperation({ summary: 'Create a new partner banner' })
  @ApiResponse({ status: 201, description: 'Partner banner created successfully' })
  @ApiBody({ type: CreatePartnerBannerDto })
  @Post()
  create(@Body() createPartnerBannerDto: CreatePartnerBannerDto) {
    return this.partnerBannerService.createPartnerBanner(createPartnerBannerDto);
  }

  @ApiOperation({ summary: 'Get all partner banners' })
  @ApiResponse({ status: 200, description: 'List of partner banners retrieved successfully' })
  @Get()
  findAll() {
    return this.partnerBannerService.findAllPartnerBanners();
  }

  @ApiOperation({ summary: 'Get a partner banner by ID' })
  @ApiResponse({ status: 200, description: 'Partner banner retrieved successfully' })
  @ApiParam({ name: 'id', description: 'The ID of the partner banner' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerBannerService.findPartnerBannerById(id);
  }

  @ApiOperation({ summary: 'Update a partner banner by ID' })
  @ApiResponse({ status: 200, description: 'Partner banner updated successfully' })
  @ApiParam({ name: 'id', description: 'The ID of the partner banner' })
  @ApiBody({ type: UpdatePartnerBannerDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePartnerBannerDto: UpdatePartnerBannerDto) {
    return this.partnerBannerService.updatePartnerBanner(id, updatePartnerBannerDto);
  }

  @ApiOperation({ summary: 'Delete a partner banner by ID' })
  @ApiResponse({ status: 200, description: 'Partner banner deleted successfully' })
  @ApiParam({ name: 'id', description: 'The ID of the partner banner' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerBannerService.deletePartnerBanner(id);
  }
}
