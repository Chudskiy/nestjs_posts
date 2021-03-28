import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfigSchema } from '../config/schema.interface';
import { CONFIG_TOKEN } from '../config/config.constants';

@Injectable()
export class AuthService {
    constructor(
        @Inject(CONFIG_TOKEN)
        private readonly config: IConfigSchema,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    //SIGNUP
        async signup(authDto: AuthDto): Promise<any> {
        const { username, password } = authDto;

        const salt = await bcrypt.genSalt();

        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password, salt);

        try {
            await user.save();
            return user;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    };


    //LOGIN
    async login(authDto): Promise<string> {
        const {username} = authDto;

        const user = await this.userRepository.findOne({username})

        const sub = user.id;

        const payload = {sub};

        return this.jwtService.sign(payload);
    };


        private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    };

}
