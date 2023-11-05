import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { CommonBigPKEntity } from './common/common.entity';
import { UserEntity } from './user.entity';

@Entity('Comment')
export class CommentEntity extends CommonBigPKEntity {
  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('bigint', { unique: false, nullable: true })
  parentId: string | null;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @Column('bigint', { unique: false, nullable: false })
  postId: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: PostEntity;
}
