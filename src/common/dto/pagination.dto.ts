import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  page?: number = 0;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  limit?: number = 10;
}
