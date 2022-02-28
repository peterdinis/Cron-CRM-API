import { Injectable } from "@nestjs/common";
import { MessageDto } from "./message.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}
}