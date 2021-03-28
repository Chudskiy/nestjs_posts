import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { PostsService } from './posts/posts.service';
import { UsersService } from './users/users.service';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { PostsController } from './posts/posts.controller';
import { UsersController } from './users/users.controller';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Like } from './entities/like.entity';
import { jwtConstants } from './auth/constants';


@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Post, User, Like]),
        ConfigModule,
        AuthModule,
        UsersModule,
        PostsModule,
        LikesModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: 60 * 60 * 24 },
        }),
        LikesModule,
    ],
    controllers: [
        AppController,
        AuthController,
        UsersController,
        PostsController,
    ],
    providers: [
        AppService,
        AuthService,
        UsersService,
        PostsService,
    ],
})
export class AppModule {
}
