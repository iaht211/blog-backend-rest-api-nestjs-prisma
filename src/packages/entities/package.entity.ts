// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';


export class PackageEntity {
    constructor(partial: Partial<PackageEntity>) {
        Object.assign(this, partial);
    }
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    time: string;

    @ApiProperty()
    cost: number;

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