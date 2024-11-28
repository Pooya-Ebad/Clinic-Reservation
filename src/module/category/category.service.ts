import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../S3/S3.service';
import { isBoolean, toBoolean } from 'src/common/utility/function.utils';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository : Repository<CategoryEntity>,
    private s3service : S3Service
  ){}
  async create(createCategoryDto: CreateCategoryDto , image : Express.Multer.File) {
    let { description , parentId, show, slug, title }= createCategoryDto
    const category = await this.findBySlug(slug)
    if(category) throw new ConflictException("category already exists")
    const { Location }= await this.s3service.uploadFile(image, "image")
    if(isBoolean(show)){
      show = toBoolean(show)
    }
    if(parentId && !isNaN(parentId)){
      await this.findById(+parentId)
    }else{parentId = null}
    await this.categoryRepository.insert({
      description,
      image : Location,
      parentId ,
      show,
      slug,
      title
    })
    return {message : "category created"}
  }

  async findAll() {
    return await this.categoryRepository.find({
      where : {},
      relations : {
        children : true,
        parent : true
      },
      select : {
        children : { slug :true },
        parent : { slug :true },

      }
    })
  }

  async findBySlug(slug: string) {
    return await this.categoryRepository.findOneBy({slug})
  }
  async findById(id: number) {
    const category = await this.categoryRepository.findOneBy({id})
    if(!category) throw new NotFoundException("category not found")
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, image : Express.Multer.File = null) {
    let { description, parentId, show, slug, title } = updateCategoryDto
    let destination : string;
    const updateData: any = {};

    await this.findById(id)
    if(image){
      const { Location }= await this.s3service.uploadFile(image, "image")
      destination = Location
    }
    if(isBoolean(show)){
      show = toBoolean(show)
      updateData.show = show
    }
    if(parentId && !isNaN(parentId)){
      await this.findById(+parentId)
      updateData.parentId = parentId
    }
    if (description) updateData.description = description;
    if (destination) updateData.image = destination;
    if (slug) updateData.slug = slug;
    if (title) updateData.title = title;
    await this.categoryRepository.update({id},{
      ...updateData
    })
    return {message : "category updated"}
  }

  async remove(id: number) {
    await this.findById(id)
    await this.categoryRepository.delete({id})
    return `category number ${id} deleted successfully`
  }
}
