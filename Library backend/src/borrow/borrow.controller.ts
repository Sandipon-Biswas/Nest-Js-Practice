// src/borrow/borrow.controller.ts
import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
@Controller('borrow')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}


  @Post()
  @Roles('user')
  async createBorrow(@Body() dto: CreateBorrowDto, @Req() req) {
    return this.borrowService.createBorrow(req.user.userId, dto);
  }


  @Get('my')
  @Roles('user')
  async myBorrows(@Req() req) {
    return this.borrowService.findMyBorrows(req.user.userId);
  }


  @Patch(':id/return')
  @Roles('user')
  async returnBook(@Param('id') id: string, @Req() req) {
    return this.borrowService.returnBorrow(req.user.userId, id);
  }


  @Get()
  @Roles('admin')
  async allBorrows() {
    return this.borrowService.findAllForAdmin();
  }


  @Patch(':id/approve')
  @Roles('admin')
  async approve(@Param('id') id: string) {
    return this.borrowService.approveBorrow(id);
  }
}
