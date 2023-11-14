import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}
  async createComment(
    content: string,
    parentId: string,
    userId: string,
    articleId: string,
  ) {
    const comment = await this.commentRepository.save({
      content: content,
      userId: userId,
      parentId: parentId,
      articleId: articleId,
    });

    return comment;
  }
}
