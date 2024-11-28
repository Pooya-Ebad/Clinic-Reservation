import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsMobilePhone, IsString, Length } from 'class-validator';

export class UpdateDoctorDto{
    @ApiPropertyOptional()
    @IsString()
    first_name : string
    @ApiPropertyOptional()
    @IsString()
    last_name : string
    @ApiPropertyOptional()
    @IsMobilePhone("fa-IR", {}, {message : "phone number is incorrect"})
    mobile : string
    @ApiPropertyOptional({format : "binary"})
    image : string
    @ApiPropertyOptional()
    @IsString()
    description : string
    @ApiPropertyOptional()
    @IsString()
    @Length(10,10, {message : "national code must be between 10 to 10"})
    national_code : string
}
 