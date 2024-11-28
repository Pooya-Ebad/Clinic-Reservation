import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { S3Service } from '../S3/S3.service';
import { UsersService } from '../users/users.service';
import { role } from 'src/common/enums/role.enum';
import { AuthService } from '../auth/auth.service';
import { CategoryService } from '../category/category.service';
import { mobileValidation } from 'src/common/utility/mobile.utils';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorEntity) private doctorRepository : Repository<DoctorEntity>,
    private s3Service : S3Service,
    private userService : UsersService,
    private authService : AuthService,
    private categoryService : CategoryService,
  ){}
  async create(createDoctorDto: CreateDoctorDto, image : Express.Multer.File, request : Request) {
    const { Medical_License_number, category, description, national_code } = createDoctorDto
    const { mobile } = request.user
    let doctor = await this.doctorRepository.findOneBy({mobile})
    if(doctor) throw new ConflictException("doctor already exist")
    await this.categoryService.findById(+category)
    const user = await this.userService.findOne(mobile)
    const { Location } = await this.s3Service.uploadFile(image,"Doctors")
    doctor  = this.doctorRepository.create({
      category,
      description,
      first_name : user.first_name,
      image : Location,
      last_name : user.last_name,
      Medical_License_number, 
      mobile,
      mobile_verify : user.mobile_verify,
      national_code,
      role : role.DOCTOR
    })
    await this.doctorRepository.save(doctor)
    const { accessToken, refreshToken } = this.authService.TokenGenerator({
      id : doctor.id, mobile , type : "doctor"
    })
    return {accessToken, refreshToken}

  }
  
  async findAll() {
    return await this.doctorRepository.find({})
  }

  async findByMobile(mobile: string) {
    const doctor = await this.doctorRepository.findOneBy({mobile})
    if(!doctor) throw new UnauthorizedException("doctor not found")
    return doctor
  }
  async findOneByLicense(medical_license: string) {
    const doctor = await this.doctorRepository.findOneBy({Medical_License_number : medical_license})
    if(!doctor) throw new UnauthorizedException("doctor not found")
    return doctor
  }

  async update(ParamMobile: string, updateDoctorDto: UpdateDoctorDto, image : Express.Multer.File) {
    const {description,first_name,last_name, mobile, national_code} = updateDoctorDto
    console.log(description, first_name, last_name, mobile, national_code);
    const { phoneNumber } = mobileValidation(ParamMobile)
    let destination : string;
    const updateData : any = {}

    await this.findByMobile(phoneNumber)
    if(image){
      const { Location } = await this.s3Service.uploadFile(image, "Doctors")
      destination = Location
    }
    if(description) updateData.description = description
    if(first_name) updateData.first_name = first_name
    if(last_name) updateData.last_name = last_name
    if(national_code) updateData.national_code = national_code
    if(destination) updateData.image = destination
    if(mobile){
      const { phoneNumber } = mobileValidation(mobile)
      updateData.description = phoneNumber
    } 
    const a = await this.doctorRepository.update({mobile : phoneNumber},{
      ...updateData
    })
    return {message : "doctor profile updated"} 
  }

  async remove(mobile: string) {
    await this.findByMobile(mobile)
    await this.doctorRepository.delete({mobile})
    return {message : "doctor deleted successfully"}
  }
}
