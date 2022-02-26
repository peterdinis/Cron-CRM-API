import { AuthService } from './auth.service';
import { Controller, Post } from "@nestjs/common";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/login")
    loginInUser() {

    }

    @Post("/signup")
    signInUser() {
        
    }
}