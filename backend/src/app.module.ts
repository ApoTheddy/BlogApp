import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/type_orm.config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { DuplicateValidationMiddleware } from './common/middlewares/duplication-validation.midleware';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    PostModule,
    AuthModule,
    CommentModule,
    ReactionModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DuplicateValidationMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.PATCH },
      );
  }
}
