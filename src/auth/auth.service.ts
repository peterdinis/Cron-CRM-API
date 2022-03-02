import { Injectable } from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "./dto"
import * as argon2 from 'argon2';
import * as jwt from "jsonwebtoken";
import { UserData, UserRO } from "./user.interface";
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';

const select = {
  email: true,
  username: true,
  bio: true,
  image: true
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService
  ) {}

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, "SOMELATER");
  };

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

    const authenticated = await argon2.verify(_user.password, payload.password);

    if (!authenticated) {
      throw new HttpException({errors}, 401);
    }

    const token = await this.generateJWT(_user);
    const {password, ...user} = _user;
    return {
      user: {token, ...user}
    };
  }

  async create(data: CreateUserDto){
    return this.prisma.user.create({
      data
    })
  }

  async update(id: number, data: UpdateUserDto): Promise<any> {
    const where = { id };
    const user = await this.prisma.user.update({ where, data, select });

    return {user};
  }

  async delete(email: string): Promise<any> {
    return await this.prisma.user.delete({ where: { email }, select });
  }

  async findById(id: number): Promise<any>{
    const user = await this.prisma.user.findFirst({ where: { id }, select: {id: true, ...select} });
    return { user };
  }

  async findByEmail(email: string): Promise<any>{
    const user = await this.prisma.user.findFirst({ where: { email }, select });
    return { user };
  }
}