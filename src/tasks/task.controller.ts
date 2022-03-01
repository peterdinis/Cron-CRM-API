import { TaskService } from "./task.service";
import { Body, Controller, Post,  Get, Param, Put, Delete } from "@nestjs/common";
import { TaskDto } from "./task.dto";

@Controller()
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get("tasks")
    getTasks() {
        return this.taskService.getTasks();
    }

    @Get("task/:id")
    getTask(@Param("id") id: any) {
        return this.taskService.getTask(id);
    }

    @Post("tasks")
    createTask(@Body() data: {name: string, status: string, author: string}) {
        const {name, status, author} = data;
        return this.taskService.createTask({
            name,
            status,
            author
        });
    }

    @Put("task/:id")
    updateTask(@Param("id") id: any, @Body() data: TaskDto) {
        return this.taskService.updateTask(id, data);
    }

    @Delete("task/:id")
    deleteTask(@Param("id") id: any) {
        return this.taskService.removeTask(id);
    }
}