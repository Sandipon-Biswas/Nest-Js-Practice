import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(title: string, content: string, userId: string) {
    const blog = new this.blogModel({ title, content, author: userId });
    return blog.save();
  }
  async getAllBlog() {
    return this.blogModel.find().populate('author', 'name email');
  }
  async getBlogById(id: string) {
    const blog = await this.blogModel
      .findById(id)
      .populate('author', 'name email');
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async updateBlog(id: string, userId: string, title: string, content: string) {
    const blog = await this.blogModel.findById(id);
    if (!blog) throw new NotFoundException('Blog not found');
    if (blog.author.toString() !== userId)
      throw new ForbiddenException('You are not the author');
    blog.title = title;
    blog.content = content;
    return blog.save();
  }

  async deleteBlog(id: string, userId: string) {
    const blog = await this.blogModel.findById(id);
    if (!blog) throw new NotFoundException('Blog not found');
    if (blog.author.toString() !== userId)
      throw new ForbiddenException('You are not the author');
    await this.blogModel.findByIdAndDelete(id);
    return { message: 'Blog deleted successfully' };
  }
}
