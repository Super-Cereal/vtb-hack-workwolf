import { PartialType } from '@nestjs/swagger';
import { CreatePartnerBannerDto } from './create-partner-banner.dto';

export class UpdatePartnerBannerDto extends PartialType(CreatePartnerBannerDto) {}
