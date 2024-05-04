import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDeviceDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    count: number;

    @IsNotEmpty()
    @ApiProperty()
    origin: string;

    @IsNotEmpty()
    @ApiProperty()
    status: string;
}
