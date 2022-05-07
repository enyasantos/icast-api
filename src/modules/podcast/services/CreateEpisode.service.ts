import { Inject, Injectable } from '@nestjs/common';
import { EpisodeDTO } from '../dto/EpisodeDTO';
import EpisodeRepository from '../infra/prisma/repositories/EpisodeRepository';

@Injectable()
export default class CreateEpisodeService {
  constructor(
    @Inject('EpisodeRepository')
    private readonly episodeRepository: EpisodeRepository,
  ) {}

  public async execute(episodedata: EpisodeDTO) {
    const episode = await this.episodeRepository.createEpisode(episodedata);
    return episode;
  }
}
