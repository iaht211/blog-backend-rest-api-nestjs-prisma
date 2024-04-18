import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoomDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    description: string;
}
