import { NoteService } from "./note.service";
import {Body, Controller, Post, Get, Param, Put, Delete} from "@nestjs/common";
import { NoteDto } from "./note.dto";
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';

@ApiTags("notes")  
@Controller()
export class NoteController {
    constructor(private noteService: NoteService) {}

    @ApiOperation({ summary: 'Get all notes' })
    @ApiResponse({status: 200})
    @Get("notes")
    getNotes() {
        return this.noteService.getNotes();
    }

    @ApiOperation({ summary: 'Get one note' })
    @Get("note/:id")
    getNote(@Param("id") id: any) {
        return this.noteService.getNote(id);
    } 

    @Post("notes")
    @ApiOperation({ summary: 'Create new note' })
    createNote(@Body() data: {name: string, status: string, author: string}) {
        const {name, status, author} = data;
        return this.noteService.createNote({
            name,
            status,
            author
        });
    }

    @Put("note/:id")
    @ApiOperation({ summary: 'Update note' })
    updateNote(@Param("id") id: any, @Body() data: NoteDto) {
        return this.noteService.updateNote(id, data);
    }

    @Delete("note/:id")
    @ApiOperation({ summary: 'Delete note' })
    deleteNote(@Param("id") id: any) {
        return this.noteService.removeNote(id);
    }
}