import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

async register (name:string, email:string,password:string){
    const existingUser= await this.usersService.findByEmail(email);
    if(existingUser){ throw new UnauthorizedException("email already exists") };
    const user =await this.usersService.createUser(name,email,password);
    return {message:'user registered successfully ',user};
}

async login(email:string, password:string){
    const user =await this.usersService.findByEmail(email);
    if(!user){ throw new UnauthorizedException('invaid creadntials') };
    const isMatch= await bcrypt.compare(password,user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    const payload={sub:user._id,email:user.email};
    const token=this.jwtService.sign(payload);
    return{access_token:token};

}





}
