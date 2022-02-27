import { ForbiddenException, Injectable } from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import { AuthDto } from "./auth.dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigModule) {}
    
    async signup(dto: AuthDto) {
        try {
            // generate password
        const hash = await argon.hash(dto.password);
        // save user in db

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },

            // this we want return
            select: {
                id: true,
                email: true,
                createdAt: true
            }
        });
        return user;
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === "P2002") {
                    throw new ForbiddenException("Credentials taken");
                } // you create record with unique field
            }

            throw error;
        }
    }


    async signin(dto: AuthDto) {
        // find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        }) ; 
        // if user not exists error
        if(!user) throw new ForbiddenException("Credentails incorect");
        // compare passwrod
        const passwordMatches = await argon.verify(user.hash, dto.password);
        if(!passwordMatches) throw new ForbiddenException("Credentails incorect");
        // if password is not the same throw error

        delete user.hash;
        return user;
    }

    async signToken(userId: number, email: string) {
        // generate token
        const payload = {
            sub: userId,
            email
        }

        
        return this.jwt.signAsync(payload, {
            // token expire
            expiresIn: "15m",
            secret: "SECRET"
        });
    }
}