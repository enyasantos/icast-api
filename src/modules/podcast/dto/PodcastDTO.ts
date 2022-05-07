import { IsOptional, IsString } from 'class-validator';

export class PodcastDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  cover: string;

  @IsString()
  @IsOptional()
  authorId: string;
}
