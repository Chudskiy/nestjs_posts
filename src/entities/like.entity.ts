import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

enum Type {
    like = 'like',
    dislike = 'dislike',
}

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: Type,
        default: Type.like,
    })
    type: string;

    @RelationId(
        (like: Like) => like.user)
    public userId: number;

    @RelationId((like: Like) => like.post)
    public postId: number;

    @ManyToOne(
        () => Post,
        post => post.likes,
        {onDelete: 'CASCADE'},
    )
    post: Post;

    @ManyToOne(
        () => User,
        user => user.likes,
        {onDelete: 'CASCADE'},
    )
    user: User;
}


