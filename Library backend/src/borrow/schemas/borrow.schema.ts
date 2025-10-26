// src/borrow/schemas/borrow.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Book } from '../../books/schemas/book.schema';

@Schema({ timestamps: true })
export class Borrow extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: Book;

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'returned'] })
  status: string;
}

export const BorrowSchema = SchemaFactory.createForClass(Borrow);
