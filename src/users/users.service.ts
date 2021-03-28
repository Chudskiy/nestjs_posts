import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../auth/repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async findOne(username: string): Promise<User | undefined> {
        return await this.userRepository.findOne({username});
    }
}
