import { Reaction } from '../entities/reaction.entity';
import { Repository } from 'typeorm';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { UserService } from 'src/user/services/user.service';
import { PostService } from 'src/post/services/post.service';
export declare class ReactionService {
    private reaction_repository;
    private readonly user_service;
    private readonly post_service;
    constructor(reaction_repository: Repository<Reaction>, user_service: UserService, post_service: PostService);
    add_reaction(createReactionDto: CreateReactionDto): Promise<Reaction>;
    find_by_id(reaction_id: number): Promise<Reaction>;
    find_reaction_by_post_id(post_id: number): Promise<Reaction>;
    find_all_reactions_by_post(post_id: number): Promise<Reaction[]>;
    delete_reaction(reaction_id: number): Promise<Reaction>;
}
