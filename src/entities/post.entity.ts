import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { Like } from './like.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public body: string;

    @Column()
    public image: string;

    @Column()
    @RelationId((post: Post) => post.user)
    public userId: number;

    @Column({default: 0})
    public likesCount: number;

    @Column({default: 0})
    public dislikesCount: number;


    @ManyToOne(
        () => User,
        user => user.posts,
        {onDelete: 'CASCADE'},
    )
    user: User;

    @OneToMany(
        () => Like,
        like => like.post,
        {onDelete: 'CASCADE'},
    )
    likes: Like[];

    @CreateDateColumn()
    public created_at: Date;
}
