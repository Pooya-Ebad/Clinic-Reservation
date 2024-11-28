import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { OtpEntity } from './entity/otp.entity';
import { DoctorEntity } from '../doctors/entities/doctor.entity';
import { AuthGuard } from './guard/auth.guard';

@Module({
    imports : [TypeOrmModule.forFeature([UserEntity , OtpEntity, DoctorEntity])],
    controllers: [AuthController],
    providers: [
      AuthService,
      JwtService,
      AuthGuard,
    ],
    exports : [AuthService , JwtService , TypeOrmModule]
  })
export class AuthModule {}
  