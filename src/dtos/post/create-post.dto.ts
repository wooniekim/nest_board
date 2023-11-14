import { PickType } from '@nestjs/swagger';
import { PostEntity } from 'src/entities/post.entity';

export class CreatePostDto extends PickType(PostEntity, ['title', 'content']) {}
