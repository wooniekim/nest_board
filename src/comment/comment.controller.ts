import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/dtos/comment/create-comment.dto';

@ApiTags('댓글 API')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: '댓글 작성 API',
    description: '유저가 댓글을 작성한다.',
  })
  @ApiBody({
    type: CreateCommentDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() body, @User() user) {
    const content = body.content;
    const parentId = body?.parentId; // 부모가 없는 경우는 undefined 리턴
    const userId = user.id;

    const comment = await this.commentService.createComment(
      content,
      parentId,
      userId,
    );

    return comment;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateComment(
    @Body() body,
    @User() user,
    @Param('id', ParseIntPipe) id,
  ) {
    const content = body.content;
    const userId = user.id;
    const commentId = id;

    const res = await this.commentService.modifyComment(
      commentId,
      userId,
      content,
    );

    return res;
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteComment(@Param('id', ParseIntPipe) id, @User() user) {
    const commentId = id;
    const userId = user.id;

    const res = await this.commentService.removeComment(commentId, userId);

    return res;
  }
}
