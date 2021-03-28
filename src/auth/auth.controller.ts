import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService,
    ) {}

    @Post('/signup')
    async signup (
        @Body() authDto: AuthDto,
    ): Promise<void> {
        return await this.authService.signup(authDto);
    }


    @Post('/login')
    async login (
        @Body() authDto:AuthDto
    ): Promise<string> {
        return await this.authService.login(authDto);
    };

}
