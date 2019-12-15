import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reference } from './reference.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class ReferenceService {

    constructor(
        @InjectRepository(Reference)
        private referenceRepository: Repository<Reference>,
    ) { }

    async  findAll(): Promise<Reference[]> {
        return await this.referenceRepository.find();
    }

    async  findByid(id): Promise<Reference[]> {
        return await this.referenceRepository.find({
            where: {
                id
            }
        });
    }

    async  create(Reference: Reference): Promise<Reference> {
        return await this.referenceRepository.save(Reference);
    }

    async update(Reference: Reference): Promise<UpdateResult> {
        return await this.referenceRepository.update(Reference.id, Reference);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.referenceRepository.delete(id);
    }
}
