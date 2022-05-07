import { Episode, Podcast, User } from '@prisma/client';

export interface PodcastFull extends Podcast {
  Episode: Episode[];
  author: User;
}
