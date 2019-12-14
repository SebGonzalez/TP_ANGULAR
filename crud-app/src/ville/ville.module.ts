import { Module } from '@nestjs/common';
import { VilleService } from './ville/ville.service';
import { VilleController } from './ville/ville.controller';

@Module({
  providers: [VilleService],
  controllers: [VilleController]
})
export class VilleModule {}
