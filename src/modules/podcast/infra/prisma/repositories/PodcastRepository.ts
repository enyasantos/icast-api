import { Inject, Injectable } from '@nestjs/common';
import { Podcast, PrismaClient } from '@prisma/client';
import { EpisodeDTO } from 'src/modules/podcast/dto/EpisodeDTO';
import { PodcastDTO } from 'src/modules/podcast/dto/PodcastDTO';
import { IPodcastRepository } from 'src/modules/podcast/repositories/IPodcastRepository';
import { PrismaService } from 'src/shared/infra/prisma/Prisma.service';

@Injectable()
export default class PodcastRepository implements IPodcastRepository {
  constructor(
    @Inject(PrismaService)
    private readonly ormRepository: PrismaClient,
  ) {}

  public async createPodcast(data: PodcastDTO): Promise<Podcast> {
    const podcast = await this.ormRepository.podcast.create({ data });
    return podcast;
  }

  public async deletePodcast(id: string): Promise<Podcast> {
    const podcast = await this.ormRepository.podcast.delete({
      where: { id },
    });
    return podcast;
  }

  public async showPodcast(id: string): Promise<Podcast> {
    const podcast = await this.ormRepository.podcast.findUnique({
      where: { id },
    });
    return podcast;
  }

  public async indexPodcasts(): Promise<Podcast[]> {
    const podcasts = await this.ormRepository.podcast.findMany();
    return podcasts;
  }

  public async indexUserPodcasts(authorId: string): Promise<Podcast[]> {
    const podcasts = await this.ormRepository.podcast.findMany({
      where: { authorId },
      include: {
        Episode: true,
      },
    });
    return podcasts;
  }
}
