import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  HttpStatus,
  HttpException,
  Logger,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import {
  CreatePostDto,
  UpdatePostWithFileDto,
} from 'src/dtos/post/create-post.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePostDto } from 'src/dtos/post/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { undefinedToNullInterceptor } from 'src/interceptors/undefinedToNull.interceptor';

@ApiTags('게시글 API')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  private readonly logger = new Logger(PostController.name);
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
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @User() user,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 100000000 })],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    if (file) {
      const post = await this.postService.createPostWithFile({
        ...createPostDto,
        userId: user.id,
        nickname: user.nickname,
        url: file.path,
      });
      return post;
    }

    const post = await this.postService.createPost({
      ...createPostDto,
      userId: user.id,
      nickname: user.nickname,
    });
    return post;
  }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  async getAllPost() {
    const post = await this.postService.getAllPost();
    return post;
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async readPost(@Param('id', ParseIntPipe) id) {
    try {
      const post = await this.postService.getPost(id);
      return post;
    } catch (error) {
      console.error('게시물 확인 중 오류 발생', error);
      throw new InternalServerErrorException('게시물 조회 중 오류 발생');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CONFLICT)
  @UseInterceptors(FileInterceptor('file'))
  @Put('/:id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @User() user,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 100000000 })],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(updatePostDto);
    try {
      console.log(updatePostDto);
      const { title, content } = updatePostDto;
      // 권한 검사: 사용자가 게시물의 소유자인지 확인 (가정된 로직)
      if (!(await this.postService.isUserPostOwner(id, user.id))) {
        throw new HttpException(
          '게시물 업데이트 권한이 없습니다',
          HttpStatus.FORBIDDEN,
        );
      }
      if (file) {
        const updateDto: UpdatePostWithFileDto = {
          id,
          title,
          content,
          url: file.path,
        };
        const res = await this.postService.modifyPostWithFile(updateDto);
        return res;
      }

      const res = await this.postService.modifyPost(
        user.id,
        id,
        title,
        content,
      );

      this.logger.log(`게시물 ${id} 업데이트 성공`);
      return res;
    } catch (error) {
      console.log(error);
      this.logger.error(`게시물 업데이트 중 오류: ${error.message}`);
      throw new HttpException(
        '게시물 업데이트 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
