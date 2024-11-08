import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { OtpEntity } from './entity/otp.entity';
import { DoctorEntity } from '../doctors/entities/doctor.entity';

@Module({
    imports : [TypeOrmModule.forFeature([UserEntity , OtpEntity, DoctorEntity])],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
    exports : [AuthService , JwtService , TypeOrmModule]
  })
export class AuthModule {}
  