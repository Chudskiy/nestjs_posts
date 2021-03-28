import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: 'secretKey',
            // secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtPayloadDto): Promise<User> {
        const {sub} = payload;

        return await this.userRepository.findOne(sub);
    }

    // @WithUser()

    // async validate(payload: JwtPayloadDto): Promise<User> {
    //     const { sub } = payload;
    //     console.log('SUB = ', sub);
    //     console.log('JwtStrategy');
    //
    //       try {
    //         return await this.userRepository.findOneOrFail(sub);
    //       } catch (error) {
    //         console.error(
    //           {
    //             message: `User not found by sub from parsed token. Error: ${error.message}`,
    //             payload,
    //           },
    //         );
    //
    //         throw new HttpException('Invalid auth token', HttpStatus.FORBIDDEN );
    //       }
    //
    //
    //     // return { password: payload.password, username: payload.username };
    //     // return { userId: payload.sub, username: payload.username };
    // }
}
