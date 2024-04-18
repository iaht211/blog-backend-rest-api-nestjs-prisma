import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class FeedbacksService {

  constructor(private prisma: PrismaService) { }

  create(createFeedbackDto: CreateFeedbackDto, user: IUser) {
    createFeedbackDto.userId = +user.id
    return this.prisma.feedback.create({
      data: createFeedbackDto
    })
  }

  findAll() {
    return this.prisma.feedback.findMany();
  }

  async findOne(id: number) {
    return this.prisma.feedback.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  update(id: number, updateFeedbackDto: any) {
    return this.prisma.feedback.update({ where: { id }, data: updateFeedbackDto });
  }

  remove(id: number) {
    return this.prisma.feedback.delete({ where: { id } });
  }
}
