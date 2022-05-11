import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import PodcastRepository from '../infra/prisma/repositories/PodcastRepository';

@Injectable()
export default class ShowPodcastService {
  constructor(
    @Inject('PodcastRepository')
    private readonly podcastRepository: PodcastRepository,
  ) {}

  public async execute(podcastId: string) {
    const podcast = await this.podcastRepository.showPodcast(podcastId);
    if (!podcast) throw new NotFoundException('Podcast not found');
    return podcast;
  }
}
