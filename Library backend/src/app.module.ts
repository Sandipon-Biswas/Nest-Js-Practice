import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

import { BorrowController } from './borrow/borrow.controller';
import { BorrowService } from './borrow/borrow.service';
import { BorrowModule } from './borrow/borrow.module';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';







@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/todoapp'),
    AuthModule,
    UsersModule,
 
    BorrowModule,
 
    BooksModule,
 
    

    

  ],
  controllers: [AppController, AuthController, UsersController,  ],
  providers: [AppService, AuthService, UsersService,  ],
})
export class AppModule {}
