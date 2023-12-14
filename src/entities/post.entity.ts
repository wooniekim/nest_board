import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common/common.entity';
import { UserEntity } from './user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('Post')
export class PostEntity extends CommonBigPKEntity {
  // 게시글 제목
  @IsString()
  @IsNotEmpty()
  @Column('varchar', { unique: false, nullable: false })
  title: string;

  // 게시글 내용
  @IsString()
  @IsNotEmpty()
  @Column('text', { unique: false, nullable: false })
  content: string;

  // 글쓴이 아이디
  @IsNotEmpty()
  @Column('bigint', { unique: false, nullable: false })
  userId: number;

  // 글쓴이 닉네임
  @IsNotEmpty()
  @Column('varchar', { unique: false, nullable: false })
  nickname: string;

  @IsNotEmpty()
  @Column('varchar', { unique: false, nullable: true })
  url: string;

  @IsNotEmpty()
  @Column('bigint', { unique: false, nullable: false, default: 0 })
  recommand: number;

  @IsNotEmpty()
  @Column('bigint', { unique: false, nullable: false, default: 0 })
  unrecommand: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'nickname', referencedColumnName: 'nickname' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
