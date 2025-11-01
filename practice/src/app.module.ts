import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // এটা দিলে পুরো প্রজেক্টে config ব্যবহার করা যাবে, আলাদা করে import লাগবে না
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todoapp',
    ),
    ProductModule,
    CategoryModule,
 
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
