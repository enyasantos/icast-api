import {
  Controller,
  Inject,
  UseGuards,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import IndexPodcastsSpotlightsService from '../../services/IndexPodcastsSpotlights.service';
import { PodcastView } from '../../view/Podcast.view';

@Controller('podcasts')
export default class PodcastSpotlightsController {
  constructor(
    @Inject('IndexPodcastsSpotlightsService')
    private indexPodcastsSpotlightsService: IndexPodcastsSpotlightsService,
  ) {}

  @Get('spotlights')
  @UseGuards(JwtAuthGuard)
  public async spotlight() {
    try {
      const podcasts = await this.indexPodcastsSpotlightsService.execute();

      if (podcasts) {
        const podcastsView = new PodcastView().renderMany(podcasts);
        return podcastsView;
      }

      return podcasts;
    } catch (error) {
      throw new InternalServerErrorException('');
    }
  }
}
