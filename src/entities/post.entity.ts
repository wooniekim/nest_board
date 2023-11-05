import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common/common.entity';
import { UserEntity } from './user.entity';

@Entity('Post')
export class PostEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false })
  title: string;

  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
