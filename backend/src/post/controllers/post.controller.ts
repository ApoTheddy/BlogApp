import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from '../services/post.service';
import { Post as PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { FindPostDto } from '../dto/find-post-query.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly post_service: PostService) {}

  @Get()
  find_all(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<PostEntity[]> {
    let findPostDto: FindPostDto = new FindPostDto(0, 10);

    if (skip) findPostDto.skip = skip >= 0 ? skip : 0;
    if (take) findPostDto.take = take >= 0 ? take : 5;

    return this.post_service.find_all(findPostDto);
  }

  @Get(':post_id')
  find_by_id(
    @Param('post_id', ParseIntPipe) post_id: number,
  ): Promise<PostEntity> {
    return this.post_service.find_by_id(post_id);
  }

  @Get('/search/:user_id')
  find_posts_by_user_id(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<PostEntity[]> {
    let findPostDto: FindPostDto = new FindPostDto(0, 10);

    if (skip) findPostDto.skip = skip >= 0 ? skip : 0;
    if (take) findPostDto.take = take >= 0 ? take : 5;

    return this.post_service.find_posts_by_user_id(user_id, findPostDto);
  }

  @Post()
  create_post(@Body() create_post_dto: CreatePostDto): Promise<PostEntity> {
    return this.post_service.create_post(create_post_dto);
  }

  @Delete(':post_id')
  delete_post(
    @Param('post_id', ParseIntPipe) post_id: number,
  ): Promise<PostEntity> {
    return this.post_service.delete_post(post_id);
  }
}
