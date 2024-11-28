import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Query, Req, UsePipes, ValidationPipe, Global } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { SwaggerEnums } from 'src/common/enums/swagger.enum';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('users')
@ApiBearerAuth("Authorization")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  @Roles(["admin"])
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiConsumes(SwaggerEnums.UrlEncoded)
  @Roles(["admin"])
  @UseGuards(AuthGuard)
  @Get("find-one/:mobile")
  async findOne(@Param("mobile") mobile: string) {
    return await this.usersService.findOne(mobile);
  }
  
  @Patch('update-user:mobile')
  @ApiConsumes(SwaggerEnums.UrlEncoded)
  update(@Param('mobile') mobile: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(mobile, updateUserDto);
  }
  
  @Delete(':mobile')
  @Roles(["admin"])
  @UseGuards(AuthGuard)
  async remove(@Param('mobile') mobile: string) {
    return await this.usersService.remove(mobile);
  }

}
 