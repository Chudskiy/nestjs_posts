import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    public username: string;

    // @IsEmail()
    // public email: string;

    @MinLength(8)
    @MaxLength(16)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    public password: string;

}



