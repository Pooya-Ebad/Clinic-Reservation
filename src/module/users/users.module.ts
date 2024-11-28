import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { OtpEntity } from '../auth/entity/otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AuthService } from '../auth/auth.service';
import { DoctorEntity } from '../doctors/entities/doctor.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports : [TypeOrmModule.forFeature([UserEntity , OtpEntity, DoctorEntity])],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, AuthService, JwtService],
  exports : [UsersService]
})
export class UsersModule {}
   