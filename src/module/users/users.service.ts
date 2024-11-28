import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/create-user.dto';
import { mobileValidation } from 'src/common/utility/mobile.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepository : Repository<UserEntity> 
  ){}
  async findAll() {
    return await this.userRepository.find({})
  }
  async findOne(mobile : string) {
    const user = await this.checkExitUser(mobile)
    return user
  }
  
  async update(QueryMobile: string, updateUserDto: UpdateUserDto){
    const { first_name, last_name, mobile }= updateUserDto
    const { phoneNumber} = mobileValidation(QueryMobile)
    const user = await this.checkExitUser(phoneNumber)
    user.first_name = first_name||user.first_name
    user.last_name = last_name||user.last_name
    user.mobile = mobile||user.mobile
    return await this.userRepository.save(user)
  }
  
  async remove(mobile: string) {
    await this.checkExitUser(mobile)
    return await this.userRepository.delete({mobile})
  }
  async checkExitUser(mobile : string) {
    const user = await this.userRepository.findOne({where : {mobile}})
    if(!user){
      throw new UnauthorizedException("user not found")
    }
    return user
  }
}
