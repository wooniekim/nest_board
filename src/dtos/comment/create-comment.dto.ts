import { PickType } from '@nestjs/swagger';
import { CommentEntity } from 'src/entities/comment.entity';

export class CreateCommentDto extends PickType(CommentEntity, ['content']) {}
