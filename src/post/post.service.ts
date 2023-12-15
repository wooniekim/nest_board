import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exceptionErr } from 'src/common/error';
import {
  CreatePostDbDto,
  CreatePostWithFileDto,
  UpdatePostWithFileDto,
} from '../dtos/post/create-post.dto';
import { PostEntity } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(createPostDbDto: CreatePostDbDto): Promise<PostEntity> {
    try {
      const post = await this.postRepository.save(createPostDbDto);
      return post;
    } catch (error) {
      console.error('게시물 생성 중 오류 발생:', error);
      throw new InternalServerErrorException('게시물 생성 중 오류 발생');
    }
  }

  async createPostWithFile(
    createPostWithFileDto: CreatePostWithFileDto,
  ): Promise<PostEntity> {
    const post = await this.postRepository.save(createPostWithFileDto);
    return post;
  }

  async getAllPost(): Promise<PostEntity[]> {
    try {
      const post = await this.postRepository.find({
        select: [
          'title',
          'nickname',
          'createdAt',
          'recommand',
          'unrecommand',
          'id',
        ],
      });
      return post;
    } catch (error) {
      exceptionErr(error);
    }
  }

  async getPost(postId: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
      relations: {
        comments: true,
      },
    });

    return post;
  }

  async modifyPostWithFile(updatePostWithFileDto: UpdatePostWithFileDto) {
    const post = await this.postRepository.update(
      {
        id: updatePostWithFileDto.id,
      },
      {
        title: updatePostWithFileDto.title,
        content: updatePostWithFileDto.content,
        url: updatePostWithFileDto.url,
      },
    );
    return post;
  }

  async modifyPost(
    userId: number,
    postId: number,
    title: string,
    content: string,
  ) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
        userId: userId,
      },
    });

    if (!post) {
      throw new UnauthorizedException('본인의 게시글이 아닙니다.');
    }

    const updateResult = await this.postRepository.update(
      { id: postId },
      {
        title: title,
        content: content,
        url: null,
      },
    );

    return { affected: updateResult?.affected };
  }

  async removePost(userId: number, postId: number) {
    try {
      const deleteResult = await this.postRepository.softDelete({
        id: postId,
        userId: userId,
      });
      return { affected: deleteResult?.affected };
    } catch (error) {
      return error.message;
    }
  }

  async recommand(postId: number, recommand: boolean) {
    try {
      if (recommand) {
        await this.postRepository
          .createQueryBuilder()
          .update()
          .set({ recommand: () => 'recommand + 1' })
          .where('id = :id', { id: postId })
          .execute();
        return {
          type: true,
          message: 'Recommand count updated successfully',
        };
      } else {
        await this.postRepository
          .createQueryBuilder()
          .update()
          .set({ unrecommand: () => 'unrecommand + 1' })
          .where('id = :id', { id: postId })
          .execute();
        return {
          type: true,
          message: 'unRecommand count updated successfully',
        };
      }
    } catch (error) {
      return error.message;
    }
  }

  async isUserPostOwner(postId: number, userId: number): Promise<boolean> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error('게시물을 찾을 수 없습니다');
    }
    return post.userId === userId;
  }
}
