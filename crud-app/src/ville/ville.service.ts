import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ville } from './ville.entity';

@Injectable()
export class VilleService {
    constructor(
        @InjectRepository(ville)
        private villeRepository: Repository<ville>,
    ) { }

    async  findAll(): Promise<ville[]> {
        return await this.villeRepository.find();
    }

    async  findById(id): Promise<ville[]> {
        return await this.villeRepository.find({
            where: {
                id
            }
        });
    }

    async  create(ville: ville): Promise<ville> {
        return await this.villeRepository.save(ville);
    }
}