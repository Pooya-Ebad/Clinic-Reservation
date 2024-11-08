import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';
import { ApiConsumes } from '@nestjs/swagger';
import { toMG } from 'src/common/utility/function.utils';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
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
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    return this.categoryService.create(createCategoryDto, image);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
