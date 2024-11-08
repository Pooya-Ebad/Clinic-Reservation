import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty()
    title : string
    @ApiProperty()
    slug : string
    @ApiProperty({format : "binary"})
    image : string
    @ApiPropertyOptional()
    description : string
    @ApiProperty()
    show : boolean
    @ApiPropertyOptional({nullable : true})
    parentId : number
}
