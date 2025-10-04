import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) {

    }

    async all(): Promise<Users[]> {
        return this.userRepository.find();
    }

    async create(data: Partial<Users>): Promise<Users> {
        return this.userRepository.save(data)
    }

    async findOneOrFail(condition): Promise<Users> {
        const user = await this.userRepository.findOne({ where: condition });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }
      






}
