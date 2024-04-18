// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class Feedback {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;


    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;

    @ApiProperty()
    createdBy: {
        name: string | null;
        email: string | null
    }

    @ApiProperty()
    deletedBy: {
        name: string | null;
        email: string | null
    };

    @ApiProperty({ required: false, nullable: true })
    userId: number | null;

    @ApiProperty({ required: false, nullable: true })
    staffId: number | null;
}