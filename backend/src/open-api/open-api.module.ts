import { Module, HttpModule } from '@nestjs/common';
import { OpenApiService } from './open-api.service';

@Module({
  imports: [HttpModule],
  providers: [OpenApiService],
  exports: [OpenApiService],
})
export class OpenApiModule {}