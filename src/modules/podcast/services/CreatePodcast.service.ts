import { Inject, Injectable } from '@nestjs/common';
import { PodcastDTO } from '../dto/PodcastDTO';
import PodcastRepository from '../infra/prisma/repositories/PodcastRepository';

@Injectable()
export default class CreatePodcastService {
  constructor(
    @Inject('PodcastRepository')
    private readonly podcastRepository: PodcastRepository,
  ) {}

  public async execute(podcastdata: PodcastDTO) {
    const podcast = await this.podcastRepository.createPodcast(podcastdata);
    return podcast;
  }
}
