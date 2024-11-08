import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    first_name : string
    @ApiProperty()
    last_name : string
    @ApiProperty()
    mobile : string
}