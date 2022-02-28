import { Injectable } from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import { NoteDto } from "./note.dto";

@Injectable()
export class NoteService {
    constructor(private prisma: PrismaService) {}

    async getNotes() {
        return this.prisma.note.findMany({});
    }

    async getNote(id: any) {
        return this.prisma.note.findUnique({
            where: id
        });
    }

    async createNote(data: NoteDto) {
        return this.prisma.note.create({
            data
        });  
    }
}