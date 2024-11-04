import { Injectable } from '@nestjs/common';
import { CreatePartnerBannerDto } from './dto/create-partner-banner.dto';
import { UpdatePartnerBannerDto } from './dto/update-partner-banner.dto';

@Injectable()
export class PartnerBannerService {
  create(createPartnerBannerDto: CreatePartnerBannerDto) {
    return 'This action adds a new partnerBanner';
  }

  findAll() {
    return `This action returns all partnerBanner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partnerBanner`;
  }

  update(id: number, updatePartnerBannerDto: UpdatePartnerBannerDto) {
    return `This action updates a #${id} partnerBanner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partnerBanner`;
  }
}
