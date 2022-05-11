import { Podcast } from '@prisma/client';
import { PodcastDTO } from '../dto/PodcastDTO';
import { PodcastFull } from '../types/podcast';

export interface IPodcastRepository {
  createPodcast(data: PodcastDTO): Promise<Podcast>;
  deletePodcast(id: string): Promise<PodcastFull>;
  showPodcast(id: string): Promise<PodcastFull>;
  indexPodcasts(): Promise<PodcastFull[]>;
  indexUserPodcasts(authorId: string): Promise<PodcastFull[]>;
  indexPodcastsSpotlights(): Promise<PodcastFull[]>;
}
