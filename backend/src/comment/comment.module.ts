import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { User } from 'src/user/entities/user.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Post } from 'src/post/entities/post.entity';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Post]),
    forwardRef(() => PostModule),
    UserModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
