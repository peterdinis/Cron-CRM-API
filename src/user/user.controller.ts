import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';

@Controller('users')
export class UserController {
  constructor() {}
  @Get('me')
  getMe(@GetUser() user: User) {
    console.log(user);
    return user;
  }
}
