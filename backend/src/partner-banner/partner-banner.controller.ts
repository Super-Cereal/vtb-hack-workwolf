import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { PartnerBannerService } from './partner-banner.service';
import { CreatePartnerBannerDto } from './dto/create-partner-banner.dto';
import { UpdatePartnerBannerDto } from './dto/update-partner-banner.dto';

@Controller('partner-banners')
export class PartnerBannerController {
  constructor(private readonly partnerBannerService: PartnerBannerService) {}

  @Post()
  create(@Body() createPartnerBannerDto: CreatePartnerBannerDto) {
    return this.partnerBannerService.createPartnerBanner(createPartnerBannerDto);
  }

  @Get()
  findAll() {
    return this.partnerBannerService.findAllPartnerBanners();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerBannerService.findPartnerBannerById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePartnerBannerDto: UpdatePartnerBannerDto) {
    return this.partnerBannerService.updatePartnerBanner(id, updatePartnerBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerBannerService.deletePartnerBanner(id);
  }
}
