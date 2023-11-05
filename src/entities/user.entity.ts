import { Column, Entity, OneToMany } from 'typeorm';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common/common.entity';

@Entity('user')
export class UserEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { unique: false, nullable: false })
  password: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: PostEntity[];
}
