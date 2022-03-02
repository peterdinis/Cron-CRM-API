import { MessageService } from "./message.service";
import {Body, Controller, Get, Param, Post, Put, Delete} from "@nestjs/common";
import { MessageDto } from "./message.dto";

@Controller()
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Get("messages")
    getMessages() {
        this.messageService.getAllMessages();
    }

    @Get("message/:id")
    getMessage(@Param("id") id: any) {
        this.messageService.getMessage(id);
    }

    @Post("messages")
    createMessage(@Body() data: {name: string, status: string, author: string, description: string}) {
        const {name, status, author, description} = data;
        return this.messageService.createMessage({
            name,
            status,
            author,
            description
        })
    }

    @Put("message/:id")
    updateMessage(@Param("id") id: any, @Body() data: MessageDto) {
        return this.messageService.updateMessage(id, data);
    }

    @Delete("message/:id")
    deleteMessage(@Param("id") id: any) {
        return this.messageService.removeMessage(id);
    }
}