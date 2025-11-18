import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

 constructor( @InjectRepository(User) private userRepo: Repository<User> ){}


 async create(data: Partial<User>){
    const user = this.userRepo.create(data);
   return await this.userRepo.save(user);
 }

async findAll(){
  return await this.userRepo.find();
}


 

 

  async findOne(id: number) {
    return  await this.userRepo.findOne({where:{id}}) ;
  }

  async update(id: number, data: Partial<User>) {
    return await this.userRepo.update(id,data);
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }
}
