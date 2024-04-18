// src/users/users.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

// src/users/users.controller.ts

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    console.log(createUserDto)
    return this.usersService.create(createUserDto)
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll(
    @Query("take") take: string,
    @Query("page") page: string,
  ) {
    // console.log(page, take);
    return this.usersService.findAll(
      +page, +take
    );
  }


  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto, @User() user: IUser
  ) {
    return await this.usersService.update(+id, updateUserDto, user);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number, @User() user: IUser) {
    return await this.usersService.remove(id);
  }
}