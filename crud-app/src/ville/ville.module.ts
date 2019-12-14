import { Module } from '@nestjs/common';
import { VilleService } from './ville.service';
import { VilleController } from './ville/ville.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ville } from './ville.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ville]),
      ],
    providers: [VilleService],
    controllers: [VilleController]
})
export class VilleModule {}
