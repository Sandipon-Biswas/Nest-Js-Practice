import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from './comment.schema';
import { Blog } from '../blogs/blog.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
  ) {}

 
  async addComment(text: string, blogId: string, userId: string) {
    const blogExists = await this.blogModel.findById(blogId);
    if (!blogExists) throw new NotFoundException('Blog not found');

    const comment = new this.commentModel({
      text,
      blog: blogId,
      author: userId,
    });
    return comment.save();
  }

  
  async getCommentsByBlog(blogId: string) {
    return this.commentModel
      .find({ blog: blogId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
  }


  async deleteComment(commentId: string, userId: string) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.author.toString() !== userId)
      throw new ForbiddenException('You cannot delete this comment');
    await this.commentModel.findByIdAndDelete(commentId);
    return { message: 'Comment deleted successfully' };
  }
}
