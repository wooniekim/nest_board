import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CreatePostDto } from 'src/dtos/post/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() body: CreatePostDto, @User() user) {
    const userId = user.id;

    const title = body.title;
    const content = body.content;

    const article = await this.postService.createPost(title, content, userId);

    return article;
  }

  @Get('/:id')
  async readPost(@Param('id') id) {
    const postId = id;

    const post = await this.postService.getPost(postId);

    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updatePost(@Param('id') id, @User() user, @Body() body) {
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

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(@Param('id') id, @User() user) {
    const userId = user.id;
    const postId = id;

    const res = await this.postService.removePost(userId, postId);

    return res;
  }
}
