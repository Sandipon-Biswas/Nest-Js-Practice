import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}


  @UseGuards(JwtAuthGuard)
  @Post(':blogId')
  async addComment(
    @Param('blogId') blogId: string,
    @Body('text') text: string,
    @Req() req,
  ) {
    const userId = req.user.userId;
    return this.commentsService.addComment(text, blogId, userId);
  }

  @Get(':blogId')
  async getComments(@Param('blogId') blogId: string) {
    return this.commentsService.getCommentsByBlog(blogId);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string, @Req() req) {
    const userId = req.user.userId;
    return this.commentsService.deleteComment(commentId, userId);
  }
}
