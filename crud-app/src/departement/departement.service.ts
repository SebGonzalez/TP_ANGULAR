import { Injectable } from '@nestjs/common';
import { Departement } from './departement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DepartementService {

    constructor(
        @InjectRepository(Departement)
        private departementRepository: Repository<Departement>,
    ) { }


    async  findAll(): Promise<Departement[]> {
        return await this.departementRepository.find();
    }

    async  create(departement: Departement): Promise<Departement> {
        return await this.departementRepository.save(departement);
    }


}
