// src/borrow/borrow.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { Borrow, BorrowSchema } from './schemas/borrow.schema';
import { Book, BookSchema } from '../books/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Borrow.name, schema: BorrowSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
