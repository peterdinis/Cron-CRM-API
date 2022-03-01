import { NoteService } from "./note.service";
import {Body, Controller, Post, Get, Param, Put, Delete} from "@nestjs/common";
import { NoteDto } from "./note.dto";


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

    @Put("note/:id")
    updateNote(@Param("id") id: any, @Body() data: NoteDto) {
        return this.noteService.updateNote(id, data);
    }

    @Delete("note/:id")
    deleteNote(@Param("id") id: any) {
        return this.noteService.removeNote(id);
    }
}