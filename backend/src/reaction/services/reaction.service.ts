import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from '../entities/reaction.entity';
import { Repository } from 'typeorm';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { UserService } from 'src/user/services/user.service';
import { PostService } from 'src/post/services/post.service';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private reaction_repository: Repository<Reaction>,
    private readonly user_service: UserService,
    private readonly post_service: PostService,
  ) {}

  async add_reaction(createReactionDto: CreateReactionDto): Promise<Reaction> {
    let user: User = await this.user_service.find_by_id(
      createReactionDto.user_id,
    );
    let post: Post = await this.post_service.find_by_id(
      createReactionDto.post_id,
    );
    let new_reaction = this.reaction_repository.create();
    new_reaction.user = user;
    new_reaction.post = post;
    return await this.reaction_repository.save(new_reaction);
  }

  async find_by_id(reaction_id: number): Promise<Reaction> {
    let reaction = await this.reaction_repository.findOne({
      where: { reaction_id },
    });
    if (!reaction) throw new NotFoundException('La reaccion no existe');
    return reaction;
  }

  async find_reaction_by_post_id(post_id: number): Promise<Reaction> {
    let reaction = await this.reaction_repository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.user', 'ru')
      .leftJoinAndSelect('r.post', 'rp')
      .select(['r', 'ru.user_id'])
      .where('rp.post_id =:post_id', { post_id })
      .getOne();
    return reaction;
  }

  async find_all_reactions_by_post(post_id: number): Promise<Reaction[]> {
    let reactions = await this.reaction_repository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.post', 'rp')
      .leftJoinAndSelect('r.user', 'ru')
      .where('rp.post_id =:post_id', { post_id })
      .select(['r', 'ru.user_id'])
      .getMany();
    return reactions;
  }

  async delete_reaction(reaction_id: number): Promise<Reaction> {
    let reaction = await this.find_by_id(reaction_id);
    return await this.reaction_repository.remove(reaction);
  }
}
