import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { Category } from '../category/category.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { generateProductCode } from '../common/utils/product-code.util';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(dto: CreateProductDto) {
    const category = await this.categoryModel.findById(dto.category);
    if (!category) throw new NotFoundException(' Invalid category!');

    const code = generateProductCode(dto.name);
    const exists = await this.productModel.findOne({ productCode: code });
    if (exists)
      throw new BadRequestException(' Product code already exists!');

    return this.productModel.create({ ...dto, productCode: code });
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException(' Product not found!');
    Object.assign(product, dto);
    return product.save();
  }

  async getAll(query: any) {
    const filter: any = {};

    if (query.category) filter.category = query.category;
    if (query.name) filter.name = { $regex: query.name, $options: 'i' };

    const products = await this.productModel.find(filter).populate('category');

    return products.map((p) => ({
      name: p.name,
      description: p.description,
      price: p.price,
      discount: p.discount,
      finalPrice: p.price - (p.price * (p.discount || 0)) / 100,
      productCode: p.productCode,
      category:(p.category as Category)?.name ,
      status: p.status,
    }));
  }
}
