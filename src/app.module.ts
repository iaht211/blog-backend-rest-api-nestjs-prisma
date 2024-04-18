import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PackagesModule } from './packages/packages.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { StaffModule } from './staff/staff.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), PrismaModule, UsersModule, AuthModule, PackagesModule, FeedbacksModule, StaffModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
