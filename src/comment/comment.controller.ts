import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() body, @User() user) {
    const content = body.content;
    const parentId = body?.parentId; // 부모가 없는 경우는 undefined 리턴
    const articleId = body.articleId;
    const userId = user.id;

    const comment = await this.commentService.createComment(
      content,
      parentId,
      userId,
      articleId,
    );

    return comment;
  }
}
