import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exceptionErr } from 'src/common/error';
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
    parentId: number,
    userId: number,
  ): Promise<CommentEntity> {
    try {
      const comment = await this.commentRepository.save({
        content: content,
        userId: userId,
        parentId: parentId,
      });
      return comment;
    } catch (error) {
      exceptionErr(error);
    }
  }

  async modifyComment(commentId: number, userId: number, content: string) {
    if (!this.checkUser(userId, commentId)) {
      throw new UnauthorizedException('본인의 댓글이 아닙니다.');
    }

    try {
      const updateResult = await this.commentRepository.update(
        { id: commentId },
        { content: content },
      );

      return { affected: updateResult?.affected };
    } catch (error) {
      return exceptionErr(error);
    }
  }

  async removeComment(commentId: number, userId: number) {
    try {
      const deleteResult = await this.commentRepository.softDelete({
        id: commentId,
        userId: userId,
      });
      return { affected: deleteResult?.affected };
    } catch (error) {
      return exceptionErr(error);
    }
  }

  /**
   *
   * @param userId number 유저 아이디
   * @param id number 코멘트 아이디
   * @returns
   */
  async checkUser(userId: number, id: number): Promise<CommentEntity> {
    try {
      const comment = await this.commentRepository.findOne({
        where: {
          id,
          userId,
        },
      });

      return comment;
    } catch (error) {
      exceptionErr(error);
    }
  }
}
