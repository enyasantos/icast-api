import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import PodcastRepository from '../infra/prisma/repositories/PodcastRepository';

@Injectable()
export default class RemovePodcastService {
  constructor(
    @Inject('PodcastRepository')
    private readonly podcastRepository: PodcastRepository,
  ) {}

  public async execute(podcastId: string) {
    const podcastExist = await this.podcastRepository.showPodcast(podcastId);
    if (!podcastExist) throw new NotFoundException('Podcast not found');

    const podcast = await this.podcastRepository.deletePodcast(podcastId);
    return podcast;
  }
}
