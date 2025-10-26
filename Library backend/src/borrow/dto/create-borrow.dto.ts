// src/borrow/dto/create-borrow.dto.ts
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateBorrowDto {
  @IsMongoId()
  @IsNotEmpty()
  bookId: string;
}
