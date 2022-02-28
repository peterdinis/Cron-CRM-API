import { Controller, Get } from '@nestjs/common';
import { GetUser } from './user.decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  userProfile(@GetUser() user: User) {
    return user;
  }
}
