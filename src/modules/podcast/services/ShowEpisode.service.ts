import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import EpisodeRepository from '../infra/prisma/repositories/EpisodeRepository';

@Injectable()
export default class ShowEpisodeService {
  constructor(
    @Inject('EpisodeRepository')
    private readonly episodeRepository: EpisodeRepository,
  ) {}

  public async execute(episodeId: string) {
    const episode = await this.episodeRepository.showEpisodes(episodeId);
    if (!episode) throw new NotFoundException('Episode not found');
    return episode;
  }
}
