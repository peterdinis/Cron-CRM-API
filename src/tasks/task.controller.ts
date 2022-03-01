import { TaskService } from "./task.service";
import { Body, Controller, Post,  Get, Param, Put, Delete } from "@nestjs/common";
import { TaskDto } from "./task.dto";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';

@ApiTags("tasks")  
@Controller()
export class TaskController {
    constructor(private taskService: TaskService) {}
    
    @ApiOperation({ summary: 'Get all tasks' })
    @Get("tasks")
    getTasks() {
        return this.taskService.getTasks();
    }

    @ApiOperation({ summary: 'Get one task' })
    @Get("task/:id")
    getTask(@Param("id") id: any) {
        return this.taskService.getTask(id);
    }

    @ApiOperation({ summary: 'Create new task' })
    @Post("tasks")
    createTask(@Body() data: {name: string, status: string, author: string}) {
        const {name, status, author} = data;
        return this.taskService.createTask({
            name,
            status,
            author
        });
    }

    @ApiOperation({ summary: 'Update tasks' })
    @Put("task/:id")
    updateTask(@Param("id") id: any, @Body() data: TaskDto) {
        return this.taskService.updateTask(id, data);
    }

    @Delete("task/:id")
    deleteTask(@Param("id") id: any) {
        return this.taskService.removeTask(id);
    }
}