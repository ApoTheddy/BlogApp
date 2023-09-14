import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostService } from 'src/post/services/post.service';
import { UserService } from 'src/user/services/user.service';
import { FindPostDto } from 'src/post/dto/find-post-query.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private comment_repository: Repository<Comment>,
    @Inject(forwardRef(() => PostService))
    private readonly post_service: PostService,
    private readonly user_service: UserService,
  ) {}

  find_all(): Promise<Comment[]> {
    return this.comment_repository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.user', 'u')
      .select(['c.content', 'u.username', 'u.profile_image'])
      .where('c.status = :status', { status: 'active' })
      .getMany();
  }

  async find_by_post_id(post_id: number, { skip, take }: FindPostDto) {
    let request = this.comment_repository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.user', 'u')
      .select(['c.content', 'u.username', 'u.profile_image'])
      .where('c.status =:status AND c.post_id =:post_id', {
        status: 'active',
        post_id,
      })
      .orderBy('c.comment_id', 'DESC');

    let [allComments, comments] = await Promise.all([
      request.getMany(),
      request.offset(skip).limit(take).getMany(),
    ]);

    return { total_comments: allComments.length, comments };
  }

  async add_comment(create_comment_dto: CreateCommentDto): Promise<Comment> {
    let post = await this.post_service.find_by_id(create_comment_dto.post_id);
    let user = await this.user_service.find_by_id(create_comment_dto.author_id);
    let new_comment = this.comment_repository.create(create_comment_dto);
    new_comment.user = user;
    new_comment.post = post;
    return await this.comment_repository.save(new_comment);
  }
}
