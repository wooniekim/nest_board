import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(
    title: string,
    content: string,
    userId: string,
    userNickname: string,
  ) {
    const post = await this.postRepository.save({
      title: title,
      content: content,
      userId: userId,
      userNickname: userNickname,
    });

    return post;
  }

  async getPost(postId: string) {
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

  async modifyPost(
    userId: string,
    postId: string,
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
      },
    );

    return { affected: updateResult?.affected };
  }

  async removePost(userId: string, postId: string) {
    const deleteResult = await this.postRepository.softDelete({
      id: postId,
      userId: userId,
    });

    return { affected: deleteResult?.affected };
  }
}
