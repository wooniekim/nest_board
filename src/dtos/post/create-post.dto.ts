import { PickType } from '@nestjs/swagger';
import { PostEntity } from 'src/entities/post.entity';

export class CreatePostDto extends PickType(PostEntity, ['title', 'content']) {}

export class CreatePostDbDto extends PickType(PostEntity, [
  'title',
  'content',
  'userId',
  'nickname',
]) {}

export class CreatePostWithFileDto extends PickType(PostEntity, [
  'title',
  'content',
  'userId',
  'nickname',
  'url',
]) {}

export class UpdatePostWithFileDto extends PickType(PostEntity, [
  'id',
  'title',
  'content',
  'url',
]) {}
