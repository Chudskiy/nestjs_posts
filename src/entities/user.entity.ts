import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    // @Column()
    // @IsEmail()
    // public email: string;

    @Column()
    public password: string;

    @OneToMany(() => Post,
        post => post.user)
    posts: Post[];

    @OneToMany(
        () => Like,
        like => like.user,
        {onDelete: 'CASCADE'},
    )
    likes: Like[];
}



