import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { Reaction } from './entities/reaction.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { ReactionService } from './services/reaction.service';
import { ReactionController } from './controllers/reaction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reaction, User, Post]),
    PostModule,
    UserModule,
  ],
  providers: [ReactionService],
  controllers: [ReactionController],
})
export class ReactionModule {}
