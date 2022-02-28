import {IsNotEmpty} from "class-validator";

export class NoteDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    author: string;
}