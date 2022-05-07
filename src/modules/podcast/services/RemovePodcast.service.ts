import { Inject, Injectable } from '@nestjs/common';
import PodcastRepository from '../infra/prisma/repositories/PodcastRepository';

@Injectable()
export default class RemovePodcastService {
  constructor(
    @Inject('PodcastRepository')
    private readonly podcastRepository: PodcastRepository,
  ) {}

  public async execute(podcastId: string) {
    const podcast = await this.podcastRepository.deletePodcast(podcastId);
    return podcast;
  }
}
