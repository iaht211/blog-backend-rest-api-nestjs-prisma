import { ApiProperty } from "@nestjs/swagger";

export class Device {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    count: number;

    @ApiProperty()
    origin: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    date: string;

    @ApiProperty()
    createdAt: Date;
}
