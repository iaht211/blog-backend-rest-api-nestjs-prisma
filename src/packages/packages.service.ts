import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorTypes, paginator, searchPaginator } from '@nodeteam/nestjs-prisma-pagination';
import { User } from '@prisma/client';

const searchPaginate: PaginatorTypes.SearchPaginateFunction = searchPaginator({ perPage: 10 });


@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) { }

  create(createPackageDto: any) {
    return this.prisma.package.create({
      data: createPackageDto as any
    })
  }

  async findAll(
  ) {

    return this.prisma.package.findMany();
  }

  async searchUser(
    page: number,
    take: number
  ) {
    const skip = (page - 1) * take;

    let defaultTake = +take ? +take : 10;
    const totalItems = (await this.prisma.package.findMany()).length;
    const totalPages = Math.ceil(totalItems / defaultTake);

    const results = await this.prisma.package.findMany({
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
    return this.prisma.package.findUnique({ where: { id } });
  }

  update(id: number, updatePackageDto: any) {
    return this.prisma.package.update({ where: { id }, data: updatePackageDto });
  }

  remove(id: number) {
    return this.prisma.package.delete({ where: { id } });
  }
}
