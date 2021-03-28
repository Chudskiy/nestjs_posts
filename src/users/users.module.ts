import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from '../auth/repositories/user.repository';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
})
export class UsersModule {}
