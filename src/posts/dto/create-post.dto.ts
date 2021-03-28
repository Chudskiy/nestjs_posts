import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @MaxLength(30)
    @MinLength(3)
    public title: string;

    @IsString()
    public body: string;

    @IsString()
    public image: string;

    public likesCount: number;

    public dislikesCount: number;
}
