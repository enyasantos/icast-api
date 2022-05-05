import { Inject, Injectable } from '@nestjs/common';
import { Episode, PrismaClient } from '@prisma/client';
import { EpisodeDTO } from 'src/modules/podcast/dto/EpisodeDTO';
import { IEpisodeRepository } from 'src/modules/podcast/repositories/IEpisodeRepository';
import { PrismaService } from 'src/shared/infra/prisma/Prisma.service';

@Injectable()
export default class EpisodeRepository implements IEpisodeRepository {
  constructor(
    @Inject(PrismaService)
    private readonly ormRepository: PrismaClient,
  ) {}
  public async createEpisode(data: EpisodeDTO): Promise<Episode> {
    const episode = await this.ormRepository.episode.create({ data });
    return episode;
  }

  public async deleteEpisode(id: string): Promise<Episode> {
    const podcast = await this.ormRepository.episode.delete({
      where: { id },
    });
    return podcast;
  }

  public async indexEpisodes(podcastId: string): Promise<Episode[]> {
    const podcast = await this.ormRepository.episode.findMany({
      where: { podcastId },
    });
    return podcast;
  }
}
