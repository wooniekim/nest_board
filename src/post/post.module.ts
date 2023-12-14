import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MulterModule } from '@nestjs/platform-express';
import multerOption from './multer/multer.option';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    MulterModule.register(multerOption()),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
