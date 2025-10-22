import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { CommentsModule } from './comments/comments.module';





@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/todoapp'),
    AuthModule,
    UsersModule,
    BlogsModule,
    CommentsModule,
    

    

  ],
  controllers: [AppController, ],
  providers: [AppService,  ],
})
export class AppModule {}
