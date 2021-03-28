import { Body, Controller, Post as NewPost, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WithUser } from '../auth/with-user.decorator';
import { LikeDto } from '../likes/dto/like.dto';
import { CreatePostDto } from './dto/create-post.dto';


@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) {
    }

    @NewPost(':id/likes')
    addLike(
        @WithUser() user: User,
        @Param() id: number,
        @Body() likeDto: LikeDto,
    ) {
        console.log('Work in posts likes');
        return this.postsService.addLike(user, id, likeDto);
    }

    @Get()
    findAllPosts(): Promise<Post[]> {
        return this.postsService.findAllPosts();
    };

    @Get(':id')
    getPost(@Param('id') id: number): Promise<Post> {
        return this.postsService.getPost(id);
    };


    @NewPost()
    createPost(
        @WithUser() user: User,
        @Body() createPostDto: CreatePostDto,
    ): Promise<Post> {
        return this.postsService.createPost(user, createPostDto);
    };

    @Delete(':id')
    deletePost(
        @Param('id') id: number,
    ): Promise<any> {
        return this.postsService.deletePost(id);
    };
}



