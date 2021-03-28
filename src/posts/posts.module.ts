import { Module } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { LikeRepository } from './repositories/likeRepository';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [ConfigModule],
    controllers: [PostsController],
    providers: [PostsService, PostRepository, LikeRepository],
})
export class PostsModule {}
