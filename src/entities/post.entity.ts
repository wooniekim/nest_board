import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common/common.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity('Post')
export class PostEntity extends CommonBigPKEntity {
  // 게시글 제목
  @ApiProperty({
    example: '게시글 제목입니다.',
    description: '게시글 제목',
    required: true,
  })
  @IsString()
  @Column('varchar', { unique: false, nullable: false })
  title: string;
  // 게시글 내용
  @ApiProperty({
    example: '게시글 내용입니다.',
    description: '게시글 내용',
    required: true,
  })
  @IsString()
  @Column('text', { unique: false, nullable: false })
  content: string;

  // 글쓴이 아이디
  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  // 글쓴이 닉네임
  @Column('varchar', { unique: false, nullable: false })
  nickname: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'nickname', referencedColumnName: 'nickname' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
