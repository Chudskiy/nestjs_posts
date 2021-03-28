import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './iwt.strategy';
import { ConfigModule } from '../config/config.module';
import { IConfigSchema } from '../config/schema.interface';
import { CONFIG_TOKEN } from '../config/config.constants';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([UserRepository]),
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: IConfigSchema) => {
                return {
                    secret: config.auth.secret,
                    signOptions: {expiresIn: config.auth.expirationTimeSeconds},
                }
            },
            inject: [CONFIG_TOKEN],
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UsersService,
        JwtStrategy,
    ],
    exports: [
        AuthService,
    ]
})
export class AuthModule {
}
