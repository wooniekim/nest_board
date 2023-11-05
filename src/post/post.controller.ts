import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() body, @User() user) {
    const userId = user.id;

    const title = body.title;
    const content = body.content;

    const article = await this.postService.createPost(title, content, userId);

    return article;
  }
}
