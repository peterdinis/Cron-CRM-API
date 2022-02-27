import { AuthService } from './auth.service';
import { Controller, Post, Body } from "@nestjs/common";
import { AuthDto } from './auth.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signup")
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post("signin")
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }
}