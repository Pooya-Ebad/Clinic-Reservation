import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from '../auth/entity/otp.entity';

@Module({
  imports : [TypeOrmModule.forFeature([OtpEntity])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
