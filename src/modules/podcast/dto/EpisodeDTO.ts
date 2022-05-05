import { IsOptional, IsString } from 'class-validator';

export class EpisodeDTO {
  @IsString()
  @IsOptional()
  file: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  cover: string;

  @IsString()
  podcastId: string;
}
