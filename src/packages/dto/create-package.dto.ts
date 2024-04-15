import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreatePackageDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    // @IsString()
    @IsNotEmpty()
    @ApiProperty()
    time: string;

    // @IsString()
    @IsNotEmpty()
    // @MinLength(6)
    @ApiProperty()
    description: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cost: number
}
