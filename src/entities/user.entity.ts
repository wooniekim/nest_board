import { Column, Entity, OneToMany } from 'typeorm';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common/common.entity';

@Entity('user')
export class UserEntity extends CommonBigPKEntity {
  // 이메일
  @Column('varchar', { unique: true, nullable: false })
  email: string;

  // 비밀번호
  @Column('varchar', { unique: false, nullable: false })
  password: string;

  // 닉네임
  @Column('varchar', { unique: true, nullable: false })
  nickname: string;

  // 닉네임
  @Column('int', { unique: true, nullable: false })
  tel: number;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: PostEntity[];
}
