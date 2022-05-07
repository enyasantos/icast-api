import { Episode } from '@prisma/client';
import { EpisodeDTO } from '../dto/EpisodeDTO';

export interface IEpisodeRepository {
  createEpisode(data: EpisodeDTO): Promise<Episode>;
  deleteEpisode(id: string): Promise<Episode>;
  indexEpisodes(podcastId: string): Promise<Episode[]>;
  showEpisodes(episodeId: string): Promise<Episode>;
}
