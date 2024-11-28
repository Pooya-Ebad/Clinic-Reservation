import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Req, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';
import { toMG } from 'src/common/utility/function.utils';
import { Request, request } from 'express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { SwaggerEnums } from 'src/common/enums/swagger.enum';

@ApiBearerAuth("Authorization")
@Controller('doctors')
@UseGuards(AuthGuard)
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(UploadFileS3("image"))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators : [
          new MaxFileSizeValidator({maxSize : toMG(10)}),
          new FileTypeValidator({fileType : "image/(png|jpg|jpeg)"})
        ]
      })
    ) image : Express.Multer.File,
    @Body() createDoctorDto: CreateDoctorDto,
    @Req() request : Request
  ) {
    return this.doctorsService.create(createDoctorDto, image ,request);
  }

  @Get()
  @Roles(["admin"])
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':medical_license')
  @Roles(["admin"])
  findByLicense(@Param('medical_license') medical_license: string) {
    return this.doctorsService.findOneByLicense(medical_license);
  }
  @Get(':mobile')
  @Roles(["admin"])
  findOne(@Param('mobile') mobile: string) {
    return this.doctorsService.findByMobile(mobile);
  }

  @Patch(':mobile')
  @Roles(["admin"])
  @ApiConsumes(SwaggerEnums.Multipart)
  update(
    @UploadedFile(
      new ParseFilePipe({
        validators : [
          new MaxFileSizeValidator({maxSize : toMG(10)}),
          new FileTypeValidator({fileType : "image/(png|jpg|jpeg)"})
        ],
        fileIsRequired : false
      })
    ) image : Express.Multer.File,
    @Param('mobile') mobile : string,
    @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(mobile, updateDoctorDto, image);
  }

  @Delete(':mobile')
  @Roles(["admin"])
  remove(@Param('mobile') mobile: string) {
    return this.doctorsService.remove(mobile);
  } 
}
