import { IsNotEmpty, IsString } from 'class-validator';

export class LikeDto {
    @IsString()
    @IsNotEmpty()
    type: string;
}
