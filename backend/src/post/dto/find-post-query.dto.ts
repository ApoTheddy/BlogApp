import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  isPositive,
} from 'class-validator';

export class FindPostDto {
  constructor(public skip: number, public take: number) {
    this.skip = skip;
    this.take = take;
  }
}
