import { Injectable } from "@nestjs/common";
import { MessageDto } from "./message.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}

    async getAllMessages() {
        return this.prisma.message.findMany({});
    }

    async getMessage(id: any) {
        return this.prisma.message.findUnique({
            where: id
        })
    }

    async createMessage(data: MessageDto) {
        return this.prisma.message.create({
            data
        })
    }

    async updateMessage(id: any, data: MessageDto) {
        return this.prisma.note.update({
            where: {
                id
            },
            data
        });
    }

    async removeMessage(id: any) {
        return this.prisma.note.delete({
            where: {
                id
            }
        })
    }
}