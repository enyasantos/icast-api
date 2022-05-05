import { Podcast } from '@prisma/client';
import { PodcastDTO } from '../dto/PodcastDTO';

export interface IPodcastRepository {
  createPodcast(data: PodcastDTO): Promise<Podcast>;
  deletePodcast(id: string): Promise<Podcast>;
  showPodcast(id: string): Promise<Podcast>;
  indexPodcasts(): Promise<Podcast[]>;
  indexUserPodcasts(authorId: string): Promise<Podcast[]>;
}
