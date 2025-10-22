import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor( @InjectModel(User.name) private userModel: Model<User> ){}

    async createUser(name:string, email:string, password:string): Promise<User> {
         const hashedPassword = await bcrypt .hash(password, 10);
         const user =new this.userModel({name,email,password:hashedPassword});
         return user.save();
    }
    async findByEmail(email:string): Promise<User|null>{
        return this.userModel.findOne({email});
    }

}
