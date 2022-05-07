import { PodcastFull } from '../types/podcast';
import { EpisodeView } from './Episode.view';

export class PodcastView {
  public render(podcast: PodcastFull) {
    const episodeView = new EpisodeView();
    const coverPath = process.env.UPLOAD_LOCATION_COVER_PODCAST.substring(2);
    return {
      id: podcast.id,
      title: podcast.title,
      description: podcast.description,
      coverUrl: `${process.env.BASE_URL}/${coverPath}/${podcast.cover}`,
      authorId: podcast.authorId,
      author: podcast.author,
      Episode: episodeView.renderMany(podcast.Episode),
    };
  }

  public renderMany(podcasts: PodcastFull[]) {
    return podcasts.map((podcast) => this.render(podcast));
  }
}
