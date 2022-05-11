import { Inject, Injectable } from '@nestjs/common';
import { Podcast, PrismaClient } from '@prisma/client';
import { PodcastDTO } from 'src/modules/podcast/dto/PodcastDTO';
import { IPodcastRepository } from 'src/modules/podcast/repositories/IPodcastRepository';
import { PodcastFull } from 'src/modules/podcast/types/podcast';
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

  public async deletePodcast(id: string): Promise<PodcastFull> {
    const podcast = await this.ormRepository.podcast.delete({
      where: { id },
      include: {
        Episode: true,
      },
    });

    console.log(podcast);
    return podcast;
  }

  public async showPodcast(id: string): Promise<PodcastFull> {
    const podcast = await this.ormRepository.podcast.findUnique({
      where: { id },
      include: {
        Episode: true,
        author: true,
      },
    });
    return podcast;
  }

  public async indexPodcasts(): Promise<PodcastFull[]> {
    const podcasts = await this.ormRepository.podcast.findMany({
      include: {
        Episode: true,
        author: true,
      },
    });
    return podcasts;
  }

  public async indexUserPodcasts(authorId: string): Promise<PodcastFull[]> {
    const podcasts = await this.ormRepository.podcast.findMany({
      where: { authorId },
      include: {
        Episode: true,
        author: true,
      },
    });
    return podcasts;
  }

  public async indexPodcastsSpotlights(): Promise<PodcastFull[]> {
    const podcasts = await this.ormRepository.podcast.findMany({
      include: {
        Episode: true,
        author: true,
      },
      orderBy: {
        Episode: {
          _count: 'desc',
        },
      },
      take: 8,
    });
    return podcasts;
  }
}
