import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) { }

  create(createPackageDto: any) {
    return this.prisma.package.create({
      data: createPackageDto as any
    })
  }

  findAll() {
    return this.prisma.package.findMany();
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
