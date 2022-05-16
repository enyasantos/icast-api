import { Inject, Injectable } from '@nestjs/common';
import PodcastRepository from '../infra/prisma/repositories/PodcastRepository';

@Injectable()
export default class IndexUserPodcastsService {
  constructor(
    @Inject('PodcastRepository')
    private readonly podcastRepository: PodcastRepository,
  ) {}

  public async execute(userId: string) {
    const podcast = await this.podcastRepository.indexUserPodcasts(userId);
    return podcast;
  }
}
