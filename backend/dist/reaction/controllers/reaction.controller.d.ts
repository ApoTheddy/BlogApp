import { ReactionService } from '../services/reaction.service';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { Reaction } from '../entities/reaction.entity';
export declare class ReactionController {
    private readonly reaction_service;
    constructor(reaction_service: ReactionService);
    find_by_id(reaction_id: number): Promise<Reaction>;
    find_all_reactions_by_post(post_id: number): Promise<Reaction[]>;
    add_reaction(createReactionDto: CreateReactionDto): Promise<Reaction>;
    delete_reaction(reaction_id: number): Promise<Reaction>;
}
