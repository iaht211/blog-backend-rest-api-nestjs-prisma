// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  create(createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;
    const password = this.getHashPassword(createUserDto.password);

    return this.prisma.user.create({
      data: { name, email, password }, // Destructure directly
    });
  }


  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        email: username
      }
    })
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
}