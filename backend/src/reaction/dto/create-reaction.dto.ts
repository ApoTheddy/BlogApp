import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReactionDto {
  @IsNumber()
  @IsNotEmpty()
  post_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
