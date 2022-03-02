import { MessageService } from "./message.service";
import {Body, Controller, Get, Param, Post, Put, Delete} from "@nestjs/common";

@Controller()
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Get("messages")
    getMessages() {}

    @Get("message/:id")
    getMessage(@Param("id") id: any) {

    }

    
}