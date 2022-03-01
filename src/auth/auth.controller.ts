import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import {User} from "./auth.decorator";
import {
    ApiBearerAuth, ApiTags
  } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags("users")

@Controller()
export class AuthController {

  constructor(private readonly userService: AuthService) {}

  @Get('user')
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Put('user')
  async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
    return await this.userService.update(userId, userData);
  }

  // @UsePipes(new ValidationPipe())
  @Post('user/register')
  async create(@Body() data: {email: string, password: string, username: string}) {
      const {email, password, username} = data;
      return this.userService.create({
        email,
        password,
        username
      });
  }

  @Delete('user/:slug')
  async delete(@Param() params) {
    return await this.userService.delete(params.slug);
  }

 //  @UsePipes(new ValidationPipe())
  @Post('user/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    return await this.userService.login(loginUserDto);
  }
}