import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async  findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async  findByEmail(email): Promise<User[]> {
        return await this.userRepository.find({
            where: {
                email
            }
        });
    }

    async  create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<UpdateResult> {
        return await this.userRepository.update(user.id, user);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}