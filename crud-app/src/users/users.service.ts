import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private contactRepository: Repository<User>,
    ) { }

    async  findAll(): Promise<User[]> {
        return await this.contactRepository.find();
    }

    async  create(contact: User): Promise<User> {
        return await this.contactRepository.save(contact);
    }

    async update(contact: User): Promise<UpdateResult> {
        return await this.contactRepository.update(contact.id, contact);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.contactRepository.delete(id);
    }
}