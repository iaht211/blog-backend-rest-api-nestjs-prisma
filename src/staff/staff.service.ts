import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaffService {

  constructor(private prisma: PrismaService) { }

  create(createStaffDto: CreateStaffDto) {
    console.log(createStaffDto);
    return this.prisma.staff.create({
      data: createStaffDto
    })
  }

  findAll() {
    return this.prisma.staff.findMany({});
  }

  findOne(id: number) {
    return this.prisma.staff.findMany({
      where: { id: id },

    });
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.prisma.staff.update({ where: { id }, data: updateStaffDto })
  }

  remove(id: number) {
    return this.prisma.staff.delete({ where: { id } });
  }
}
