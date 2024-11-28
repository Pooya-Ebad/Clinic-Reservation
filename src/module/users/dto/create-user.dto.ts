import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsString } from "class-validator";

export class FindUserDto {
    @ApiProperty()
    @IsMobilePhone("fa-IR", {}, {message : "phone number is incorrect"})
    mobile : string
}
export class CreateUserDto {
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

