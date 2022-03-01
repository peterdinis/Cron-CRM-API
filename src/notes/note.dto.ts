import {IsNotEmpty} from "class-validator";

export class NoteDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    author: string;
}


export class StatusNoteDto {
    @IsNotEmpty()
    status: string;
}