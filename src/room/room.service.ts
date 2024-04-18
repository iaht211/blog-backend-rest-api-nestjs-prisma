import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Console } from 'console';

@Injectable()
export class RoomService {

  constructor(private prisma: PrismaService) { }

  create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({
      data: createRoomDto
    })
  }

  findAll() {
    return this.prisma.room.findMany({});
  }

  findOne(id: number) {
    return this.prisma.room.findMany({ where: { id: id } });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.prisma.room.update({ where: { id }, data: updateRoomDto });
  }

  remove(id: number) {
    return this.prisma.room.delete({ where: { id } });
  }
}
