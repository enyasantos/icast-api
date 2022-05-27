import {
  Controller,
  Inject,
  UseGuards,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import SearchPodcastService from '../../services/SearchPodcast.service';
import { PodcastView } from '../../view/Podcast.view';

@Controller('podcasts')
export default class PodcastSearchController {
  constructor(
    @Inject('SearchPodcastService')
    private searchPodcastService: SearchPodcastService,
  ) {}

  @Get('search')
  @UseGuards(JwtAuthGuard)
  public async spotlight(@Query('keyword') keyword: string) {
    try {
      const podcasts = await this.searchPodcastService.execute(keyword);

      if (podcasts) {
        const podcastsView = new PodcastView().renderMany(podcasts);
        return podcastsView;
      }

      return podcasts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
