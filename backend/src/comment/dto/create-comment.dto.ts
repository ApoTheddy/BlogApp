import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  author_id: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  post_id: number;
}
