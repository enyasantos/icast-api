import { Episode } from '@prisma/client';

export class EpisodeView {
  public render(episode: Episode) {
    const episodePath = process.env.UPLOAD_LOCATION_EPISODE.substring(2);
    const coverPath = process.env.UPLOAD_LOCATION_COVER_EPISODE.substring(2);
    return {
      id: episode.id,
      fileUrl: `${process.env.BASE_URL}/${episodePath}/${episode.file}`,
      title: episode.title,
      description: episode.description,
      coverUrl: `${process.env.BASE_URL}/${coverPath}/${episode.cover}`,
      podcastId: episode.podcastId,
    };
  }

  public renderMany(episodes: Episode[]) {
    return episodes.map((episode) => this.render(episode));
  }
}
