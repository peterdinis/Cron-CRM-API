import { NoteService } from "./note.service";
import {Body, Controller, Post, Get, Param} from "@nestjs/common";

@Controller()
export class NoteController {
    constructor(private noteService: NoteService) {}

    @Get("notes")
    getNotes() {
        return this.noteService.getNotes();
    }

    @Get("note/:id")
    getNote(@Param("id") id: any) {
        return this.noteService.getNote(id);
    } 

    @Post("notes")
    createNote(@Body() data: {name: string, status: string, author: string}) {
        const {name, status, author} = data;
        return this.noteService.createNote({
            name,
            status,
            author
        });
    }
}