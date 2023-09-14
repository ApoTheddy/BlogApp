import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UserService } from 'src/user/services/user.service';
import { FindPostDto } from '../dto/find-post-query.dto';
import { Post } from '../entities/post.entity';
import { Comment } from 'src/comment/comment.entity';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private post_repository: Repository<Post>,
    private readonly user_service: UserService,
    @Inject(forwardRef(() => CommentService))
    private readonly comment_service: CommentService,
  ) {}

  async find_all({ skip, take }: FindPostDto): Promise<Post[]> {
    let posts: Post[] = await this.post_repository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.user', 'pu')
      .select([
        'p',
        'pu.user_id',
        'pu.username',
        'pu.profile_image',
        'pu.career',
      ])
      .where('p.status =:status', { status: 'active' })
      .offset(skip)
      .limit(take)
      .getMany();
    return posts;
  }

  async find_posts_by_user_id(
    user_id: number,
    { skip, take }: FindPostDto,
  ): Promise<Post[]> {
    let user = await this.user_service.find_by_id(user_id);
    let posts = await this.post_repository.find({
      where: { user: { user_id: user.user_id },status: "active" },
      skip,
      take,
    });

    return posts;
  }

  async create_post(create_post_dto: CreatePostDto): Promise<Post> {
    const user = await this.user_service.find_by_id(create_post_dto.user_id);

    let new_post = this.post_repository.create(create_post_dto);
    new_post.type_publication = create_post_dto.image ? 'text-image' : 'text';
    new_post.user = user;
    return await this.post_repository.save(new_post);
  }

  async find_by_id(post_id: number): Promise<Post> {
    const post = await this.post_repository.findOne({ where: { post_id } });

    if (!post)
      throw new NotFoundException(`El post con el ID ${post_id} no existe`);

    return post;
  }

  async delete_post(post_id: number): Promise<Post> {
    const post = await this.find_by_id(post_id);
    post.status = 'inactive';
    return this.post_repository.save(post);
  }
}
