import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { WithUser } from '../auth/with-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get('me')
    async me(@WithUser() user: User): Promise<User> {
        return user;
    }
}
