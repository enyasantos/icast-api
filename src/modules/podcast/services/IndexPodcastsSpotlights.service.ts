import { Inject, Injectable } from '@nestjs/common';
import PodcastRepository from '../infra/prisma/repositories/PodcastRepository';

@Injectable()
export default class IndexPodcastsSpotlightsService {
  constructor(
    @Inject('PodcastRepository')
    private readonly podcastRepository: PodcastRepository,
  ) {}

  public async execute() {
    const podcasts = await this.podcastRepository.indexPodcastsSpotlights();
    return podcasts;
  }
}
