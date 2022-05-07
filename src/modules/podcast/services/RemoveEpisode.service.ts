import { Inject, Injectable } from '@nestjs/common';
import EpisodeRepository from '../infra/prisma/repositories/EpisodeRepository';

@Injectable()
export default class RemoveEpisodeService {
  constructor(
    @Inject('EpisodeRepository')
    private readonly episodeRepository: EpisodeRepository,
  ) {}

  public async execute(episodeId: string) {
    const podcast = await this.episodeRepository.deleteEpisode(episodeId);
    return podcast;
  }
}
