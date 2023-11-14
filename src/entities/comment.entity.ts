import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { CommonBigPKEntity } from './common/common.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Comment')
export class CommentEntity extends CommonBigPKEntity {
  @ApiProperty({
    example: '댓글 내용입니다.',
    description: '댓글 내용',
    required: true,
  })
  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('bigint', { unique: false, nullable: true })
  parentId: string | null;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @ApiProperty({
    example: '1',
    description: '댓글을 달 post의 ID입니다.',
    required: true,
  })
  @Column('bigint', { unique: false, nullable: false })
  postId: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: PostEntity;
}
