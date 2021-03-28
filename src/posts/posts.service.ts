import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './repositories/post.repository';
import { LikeRepository } from './repositories/likeRepository';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { Like } from '../entities/like.entity';
import { LikeDto } from '../likes/dto/like.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { CONFIG_TOKEN } from '../config/config.constants';
import { IConfigSchema } from '../config/schema.interface';


@Injectable()
export class PostsService {
    constructor(
        @Inject(CONFIG_TOKEN)
        private readonly config: IConfigSchema,
        @InjectRepository(Post)
        private readonly postRepository: PostRepository,
        @InjectRepository(Like)
        private readonly likeRepository: LikeRepository,
    ) {
    }


    // LIKES SYSTEM

    async addLike(
        user: User,
        id: number,
        likeDto: LikeDto,
    ): Promise<any> {
        console.log('userId = ', user.id, 'postId = ', id, 'dto = ', likeDto);
        const post = await this.postRepository.findOne(id);

        console.log('post.likesCount = ', post.likesCount);
        console.log('post.dislikesCount = ', post.dislikesCount);

        const getLike = await this.likeRepository.findOne({ where: { user: user.id, post: post.id } });

        const { type } = likeDto;
        const isUserIsPostAuthor = post.userId === user.id;

        // const likeTypeIsLike = 'like';
        // const likeTypeIsDislike = 'dislike';


        if (isUserIsPostAuthor) {
            throw new BadRequestException(
                'User can\'t send like to your own post!');
        }

        if (getLike && getLike.type === type) {
            return this.likeRepository.delete(getLike.id);
        }


        if (getLike && getLike.type != type) {

            return this.likeRepository.update(
                getLike.id,
                { type },
            );
        };


        const newLike = await this.likeRepository.create({
            type,
            user,
            post,
        });

        return await this.likeRepository.save(newLike);
    }


    async createPost(
        user: User,
        createPostDto: CreatePostDto,
    ): Promise<Post> {
        const newPost = this.postRepository.create({
            ...createPostDto,
            userId: user.id,
        });

        return await this.postRepository.save(newPost);
    };

    async findAllPosts(): Promise<Post[]> {
        // const firstPost = await this.postRepository
        //     .createQueryBuilder("post")
        //     .where("post.id = :id", { id: 1 })
        //     .getOne();

        const posts = await this.postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.likes", "likes")
            .getMany();

        // const likes = await this.likeRepository
        //     .createQueryBuilder('like')
        //     .leftJoinAndSelect("like.post", "post")
        //     .getMany();



        // const posts = await this.postRepository.find({
        //     relations: ['likes'],
        // });

        console.log('posts in post service = ', posts)
        // console.log('likes in post service = ', likes)

        return posts;
    };





    async getPost(id: number): Promise<Post> {
        return await this.postRepository.findOne(id);
    };

    async deletePost(
        id: number,
    ): Promise<any> {
        return await this.postRepository.delete(id);
    };
}




