import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsMobilePhone, IsString, Length, Matches } from "class-validator";
import { role } from "src/common/enums/role.enum";

export class CreateOtpDto {
    @ApiProperty()
    @IsString()
    // @Matches()
    first_name : string
    @ApiProperty()
    @IsString()
    last_name : string
    @ApiProperty()
    @IsMobilePhone ("fa-IR", {}, {message : "phone number is incorrect"})
    mobile : string
}
export class SendOtpDto {
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
export class RefreshTokenDto {
    @ApiProperty()
    @IsJWT({message : "token incorrect"})
    RefreshToken : string
}