import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
} from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FindPostDto } from 'src/post/dto/find-post-query.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly comment_service: CommentService) {}

  @Get()
  find_all(): Promise<Comment[]> {
    return this.comment_service.find_all();
  }

  @Get(':post_id')
  find_by_post_id(
    @Param('post_id', ParseIntPipe) post_id: number,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    let findPostDto: FindPostDto = new FindPostDto(0, 10);

    if (skip) findPostDto.skip = skip >= 0 ? skip : 0;
    if (take) findPostDto.take = take >= 0 ? take : 5;

    return this.comment_service.find_by_post_id(post_id, findPostDto);
  }

  @Post()
  add_comment(@Body() create_comment_dto: CreateCommentDto): Promise<Comment> {
    return this.comment_service.add_comment(create_comment_dto);
  }
}
