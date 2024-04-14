// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';


export class PackageEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    time: string;

    @Exclude()
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

}