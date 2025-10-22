import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  @Get()
  async getAll() {
    return this.blogsService.getAllBlog();
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.blogsService.getBlogById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Req() req,
  ) {
    const userId = req.user.userId; // jwt.strategy.ts থেকে আসছে
    return this.blogsService.createBlog(title, content, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('content') content: string,
    @Req() req,
  ) {
    const userId = req.user.userId;
    return this.blogsService.updateBlog(id, userId, title, content);
  }

  // Protected delete
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.blogsService.deleteBlog(id, userId);
  }
}
