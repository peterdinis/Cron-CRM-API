import { IsNotEmpty } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    author: string;
}