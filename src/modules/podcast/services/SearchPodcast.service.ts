import { Inject, Injectable } from '@nestjs/common';
import PodcastRepository from '../infra/prisma/repositories/PodcastRepository';

@Injectable()
export default class SearchPodcastService {
  constructor(
    @Inject('PodcastRepository')
    private readonly podcastRepository: PodcastRepository,
  ) {}

  public async execute(keyword: string) {
    const podcasts = await this.podcastRepository.searchPodcast(keyword);
    return podcasts;
  }
}
