import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

enum Status {
  active = 'active',
  inactive = 'inactive',
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  image?: string;

  @IsString()
  @IsOptional()
  @IsEnum(Status)
  type_publication?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  user_id: number;
}
