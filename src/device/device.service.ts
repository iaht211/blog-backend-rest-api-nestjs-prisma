import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceService {

  constructor(private prisma: PrismaService) { }

  create(createDeviceDto: CreateDeviceDto) {
    console.log(createDeviceDto);
    return this.prisma.device.create({
      data: createDeviceDto
    })
  }

  findAll() {
    return this.prisma.device.findMany({});
  }

  findOne(id: number) {
    return this.prisma.device.findMany({ where: { id } });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return this.prisma.device.update({ where: { id }, data: updateDeviceDto });
  }

  remove(id: number) {
    return this.prisma.device.delete({ where: { id } });
  }
}
