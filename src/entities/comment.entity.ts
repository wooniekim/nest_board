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
  parentId: number;

  @Column('bigint', { unique: false, nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
  post: PostEntity;
}
