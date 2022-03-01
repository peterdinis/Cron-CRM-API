import { IsNotEmpty } from "class-validator";

export class TaskDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    author: string;
}

export interface ChangeStatusDto {
    status: string;
}