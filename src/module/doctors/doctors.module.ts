import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from '../auth/entity/otp.entity';
import { DoctorEntity } from './entities/doctor.entity';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { S3Service } from '../S3/S3.service';
import { UsersService } from '../users/users.service';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports : [TypeOrmModule.forFeature([DoctorEntity, UserEntity , OtpEntity, DoctorEntity, CategoryEntity])],
  controllers: [DoctorsController],
  providers: [
    DoctorsService,
    AuthGuard,
    AuthService,
    JwtService,
    S3Service,
    UsersService,
    CategoryService
  ]
  ,
})
export class DoctorsModule {}
 