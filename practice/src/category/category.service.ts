import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';


@Injectable()
export class CategoryService {
  constructor( @InjectModel(Category.name) private categoryModel:Model<Category>  ){}
  async create(dto: CreateCategoryDto ){
    const exists = await this.categoryModel.findOne({name:dto.name});
    if(exists) throw new BadRequestException('category aready exits')
    return this.categoryModel.create(dto);
  }
  async findAll(){
    return this.categoryModel.find();
  }

}
