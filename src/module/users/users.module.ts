import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { OtpEntity } from '../auth/entity/otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([UserEntity , OtpEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
   