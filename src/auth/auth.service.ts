import { ForbiddenException, Injectable } from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "./dto"
import * as argon2 from 'argon2';
import * as jwt from "jsonwebtoken";
import { UserRO } from "./user.interface";
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';

const select = {
  email: true,
  username: true
};


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService
  ) {}

  async findAll(): Promise<any[]> {
    return await this.prisma.user.findMany({ select });
  }

  async login(payload: LoginUserDto){
    const _user = await this.prisma.user.findUnique({
      where: {email: payload.email}
    });

    const errors = { User: 'email or password wrong' };

    if (!_user) {
      throw new HttpException({errors}, 401);
    }

    const authenticated = await argon2.verify(_user., payload.password);

    if (!authenticated) {
      throw new HttpException({errors}, 401);
    }

    const token = await this.generateJWT(_user);
    const {password, ...user} = _user;
    return {
      user: {token, ...user}
    };
  }
}