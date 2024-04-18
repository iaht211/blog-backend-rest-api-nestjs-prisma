// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';


export class UserEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @Exclude()
    password: string;

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

    @ApiProperty()
    refreshToken: string;


    @ApiProperty({ required: false, nullable: true })
    packageId: number | null;

    @ApiProperty({ required: false, nullable: true })
    roomId: number | null;

}