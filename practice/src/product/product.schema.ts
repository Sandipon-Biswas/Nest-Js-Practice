import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../category/category.schema';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true }) name: string;

  @Prop() description: string;

  @Prop({ required: true }) price: number;

  @Prop({ default: 0 }) discount: number;

  @Prop() image: string;

  @Prop({ enum: ['In Stock', 'Stock Out'], default: 'In Stock' })
  status: string;

  @Prop({ unique: true }) productCode: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
