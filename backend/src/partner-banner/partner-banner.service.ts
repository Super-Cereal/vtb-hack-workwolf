import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePartnerBannerDto } from './dto/create-partner-banner.dto';
import { UpdatePartnerBannerDto } from './dto/update-partner-banner.dto';
import { ObjectCategory } from 'src/models/object-category.model';
import { PartnerBanner } from 'src/models/partner-banner.model';

@Injectable()
export class PartnerBannerService {
  constructor(
    @InjectModel(PartnerBanner)
    private partnerBannerModel: typeof PartnerBanner,
    @InjectModel(ObjectCategory)
    private objectCategoryModel: typeof ObjectCategory,
  ) {}

  async createPartnerBanner(
    createPartnerBannerDto: CreatePartnerBannerDto,
  ): Promise<PartnerBanner> {
    const objectCategory = await this.objectCategoryModel.findByPk(
      createPartnerBannerDto.ObjectCategoryId,
    );
    if (!objectCategory) {
      throw new NotFoundException('ObjectCategory not found');
    }

    return this.partnerBannerModel.create(createPartnerBannerDto);
  }

  async findAllPartnerBanners(): Promise<PartnerBanner[]> {
    return this.partnerBannerModel.findAll();
  }

  async findPartnerBannerById(id: string): Promise<PartnerBanner> {
    const partnerBanner = await this.partnerBannerModel.findByPk(id);
    if (!partnerBanner) {
      throw new NotFoundException('PartnerBanner not found');
    }
    return partnerBanner;
  }

  async updatePartnerBanner(
    id: string,
    updatePartnerBannerDto: UpdatePartnerBannerDto,
  ): Promise<PartnerBanner> {
    const partnerBanner = await this.partnerBannerModel.findByPk(id);
    if (!partnerBanner) {
      throw new NotFoundException('PartnerBanner not found');
    }

    if (updatePartnerBannerDto.ObjectCategoryId) {
      const objectCategory = await this.objectCategoryModel.findByPk(
        updatePartnerBannerDto.ObjectCategoryId,
      );
      if (!objectCategory) {
        throw new NotFoundException('ObjectCategory not found');
      }
    }

    partnerBanner.url = updatePartnerBannerDto.url ?? partnerBanner.url;
    partnerBanner.desc = updatePartnerBannerDto.desc ?? partnerBanner.desc;
    partnerBanner.name = updatePartnerBannerDto.name ?? partnerBanner.name;
    partnerBanner.ObjectCategoryId =
      updatePartnerBannerDto.ObjectCategoryId ?? partnerBanner.ObjectCategoryId;

    return partnerBanner.save();
  }

  async deletePartnerBanner(id: string): Promise<void> {
    const deletedRows = await this.partnerBannerModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new NotFoundException('PartnerBanner not found');
    }
  }
}
