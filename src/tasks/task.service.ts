import { Injectable } from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {TaskDto} from "./task.dto";

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async getTasks() {
        return this.prisma.task.findMany({});
    }

    async getTask(id: any) {
        return this.prisma.task.findUnique({
            where: id
        })
    }

    async createTask(data: TaskDto) {
        return this.prisma.task.create({
            data
        });
    }
}