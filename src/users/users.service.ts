// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { IUser } from './users.interface';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  create(createUserDto: any) {
    const password = this.getHashPassword(createUserDto.password)
    const { email, name, packageId } = createUserDto;
    const input = { email, name, packageId, password }
    return this.prisma.user.create({
      data: input, // Destructure directly
    });
  }

  async findAll(
    page: number,
    take: number
  ) {
    const skip = (page - 1) * take;

    let defaultTake = +take ? +take : 10;
    const totalItems = (await this.prisma.user.findMany()).length;
    const totalPages = Math.ceil(totalItems / defaultTake);

    const results = await this.prisma.user.findMany({
      skip: skip,
      take: take,
    })
    return {
      meta: {
        current: page, //trang hiện tại
        pageSize: take, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      results
    }

  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        package: true,
      },
    });
  }

  update(id: number, updateUserDto: any, user: IUser) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  findOneByUsername(email: string) { // Allow email to be null
    return this.prisma.user.findUnique({
      where: { email }, // Optional chaining and lowercase conversion
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  updateUserToken(refresh_token: string, id: number) {
    const refreshToken = { refreshToken: refresh_token }
    return this.prisma.user.update({ where: { id }, data: refreshToken });
  }

  findUserByToken(refreshToken: string) {
    const data = { refreshToken };
    return this.prisma.user.findUnique({
      where: { refreshToken }
    });
  }
}