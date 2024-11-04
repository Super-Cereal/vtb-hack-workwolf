import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerBannerService } from './partner-banner.service';
import { CreatePartnerBannerDto } from './dto/create-partner-banner.dto';
import { UpdatePartnerBannerDto } from './dto/update-partner-banner.dto';

@Controller('partner-banner')
export class PartnerBannerController {
  constructor(private readonly partnerBannerService: PartnerBannerService) {}

  @Post()
  create(@Body() createPartnerBannerDto: CreatePartnerBannerDto) {
    return this.partnerBannerService.create(createPartnerBannerDto);
  }

  @Get()
  findAll() {
    return this.partnerBannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerBannerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerBannerDto: UpdatePartnerBannerDto) {
    return this.partnerBannerService.update(+id, updatePartnerBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerBannerService.remove(+id);
  }
}
