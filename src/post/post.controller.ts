import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CreatePostDto } from 'src/dtos/post/create-post.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { undefinedToNullInterceptor } from 'src/interceptors/undefinedToNull.interceptor';

@ApiTags('게시글 API')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: '게시글 작성 API',
    description: '유저가 게시글을 작성한다.',
  })
  @ApiBody({
    type: CreatePostDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() body: CreatePostDto, @User() user) {
    const userId = user.id;
    const userNickname = user.nickname;

    const title = body.title;
    const content = body.content;

    const post = await this.postService.createPost(
      title,
      content,
      userId,
      userNickname,
    );

    return post;
  }

  @Get('/:id')
  async readPost(@Param('id', ParseIntPipe) id) {
    const postId = id;

    const post = await this.postService.getPost(postId);

    return post;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updatePost(@Param('id', ParseIntPipe) id, @User() user, @Body() body) {
    const userId = user.id;
    const postId = id;

    const title = body.title;
    const content = body.content;

    const res = await this.postService.modifyPost(
      userId,
      postId,
      title,
      content,
    );

    return res;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(@Param('id', ParseIntPipe) id, @User() user) {
    const userId = user.id;
    const postId = id;

    const res = await this.postService.removePost(userId, postId);

    return res;
  }
}
