import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Blog.name, schema:BlogSchema}]),
    AuthModule,
  ],
  providers: [BlogsService],
  controllers: [BlogsController]
})
export class BlogsModule {}
