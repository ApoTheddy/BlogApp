import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ReactionService } from '../services/reaction.service';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { Reaction } from '../entities/reaction.entity';

@Controller('reactions')
export class ReactionController {
  constructor(private readonly reaction_service: ReactionService) {}

  @Get(':reaction_id')
  find_by_id(
    @Param('reaction_id', ParseIntPipe) reaction_id: number,
  ): Promise<Reaction> {
    return this.reaction_service.find_by_id(reaction_id);
  }

  @Get('/search/:post_id')
  find_all_reactions_by_post(
    @Param('post_id', ParseIntPipe) post_id: number,
  ): Promise<Reaction[]> {
    return this.reaction_service.find_all_reactions_by_post(post_id);
  }

  @Post()
  add_reaction(
    @Body() createReactionDto: CreateReactionDto,
  ): Promise<Reaction> {
    return this.reaction_service.add_reaction(createReactionDto);
  }

  @Delete(':reaction_id')
  delete_reaction(@Param('reaction_id', ParseIntPipe) reaction_id: number) {
    return this.reaction_service.delete_reaction(reaction_id);
  }
}
