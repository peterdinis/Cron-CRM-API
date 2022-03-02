import {
  Injectable,
  HttpException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.name,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, "SOME SECRET");
  };

  async signup(dto: AuthDto) {
    const hashedPassword = await argon2.hash(dto.password);

    const data: any = {
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    }
    const user = await this.prisma.user.create({ data});

    return user;
  }

  async signin(dto: AuthDto) {
    const _user = await this.prisma.user.findFirst({
      where: {
        email: dto.email
      }
    });

    const errors = { User: 'email or password wrong' };

    if (!_user) {
      throw new HttpException({errors}, 401);
    }

    const authenticated = await argon2.verify(_user.password, dto.password);

    if (!authenticated) {
      throw new HttpException({errors}, 401);
    }

    const token = await this.generateJWT(_user);
    const {password, ...user} = _user;
    return {
      user: {token, ...user}
    };
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    return user;
  }
}