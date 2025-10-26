// src/borrow/borrow.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Borrow } from './schemas/borrow.schema';
import { Book } from '../books/schemas/book.schema';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Injectable()
export class BorrowService {
  constructor(
    @InjectModel(Borrow.name) private borrowModel: Model<Borrow>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}


  async createBorrow(userId: string, createBorrowDto: CreateBorrowDto) {
    const book = await this.bookModel.findById(createBorrowDto.bookId);
    if (!book) throw new NotFoundException('Book not found');

    const alreadyBorrowed = await this.borrowModel.findOne({
      user: userId,
      book: book._id,
      status: { $ne: 'returned' },
    });

    if (alreadyBorrowed) {
      throw new ForbiddenException('You already borrowed this book.');
    }

    const borrow = new this.borrowModel({
      user: userId,
      book: book._id,
      status: 'pending',
    });

    return borrow.save();
  }


  async findMyBorrows(userId: string) {
    return this.borrowModel.find({ user: userId }).populate('book');
  }


  async findAllForAdmin() {
    return this.borrowModel.find().populate('user').populate('book');
  }


  async approveBorrow(id: string) {
    const borrow = await this.borrowModel.findById(id);
    if (!borrow) throw new NotFoundException('Borrow not found');
    borrow.status = 'approved';
    return borrow.save();
  }


  async returnBorrow(userId: string, borrowId: string) {
    const borrow = await this.borrowModel.findById(borrowId);
    if (!borrow) throw new NotFoundException('Borrow record not found');

    if (borrow.user.toString() !== userId) {
      throw new ForbiddenException('You can return only your borrowed books.');
    }

    if (borrow.status === 'returned') {
      throw new ForbiddenException('Already returned.');
    }

    borrow.status = 'returned';
    return borrow.save();
  }
}
