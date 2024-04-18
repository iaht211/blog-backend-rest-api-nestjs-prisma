import { ApiProperty } from "@nestjs/swagger";

export class Staff {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    permission: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    createdBy: {
        name: string | null;
        email: string | null
    }

    @ApiProperty({ required: false, nullable: true })
    roomId: number | null;
}
