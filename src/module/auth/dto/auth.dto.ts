import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsString, Length } from "class-validator";
import { role } from "src/common/enums/role.enum";

export class SendOtpDto {
    @ApiProperty()
    @IsString()
    first_name : string
    @ApiProperty()
    @IsString()
    last_name : string
    @ApiProperty()
    @IsMobilePhone ("fa-IR", {}, {message : "phone number is incorrect"})
    mobile : string
}
export class CheckOtpDto {
    @ApiProperty()
    @IsMobilePhone("fa-IR", {}, {message : "phone number is incorrect"})
    mobile : string
    @ApiProperty()
    @IsString()
    @Length(5,5 ,{message : "incorrect code"})
    code : string
}
export class RoleDto {
    @ApiProperty()
    @IsMobilePhone("fa-IR", {}, {message : "phone number is incorrect"})
    mobile : string
    @ApiProperty({enum : role})
    @IsString()
    role : string
}