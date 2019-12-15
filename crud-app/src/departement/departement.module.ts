import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement/departement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departement } from './departement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Departement]),
  ],
  providers: [DepartementService],
  controllers: [DepartementController]
})
export class DepartementModule {}
