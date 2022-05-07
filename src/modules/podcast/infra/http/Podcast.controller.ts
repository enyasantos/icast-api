import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  InternalServerErrorException,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import { PodcastDTO } from '../../dto/PodcastDTO';
import CreatePodcastService from '../../services/CreatePodcast.service';
import IndexPodcastsService from '../../services/IndexPodcasts.service';
import IndexPodcastsSpotlightsService from '../../services/IndexPodcastsSpotlights.service';
import IndexUserPodcastsService from '../../services/IndexUserPodcasts.service';
import RemovePodcastService from '../../services/RemovePodcast.service';
import ShowPodcastService from '../../services/ShowPodcast.service';
import { multerOptions } from '../../utils/multerConfigCoverPodcast';
import { PodcastView } from '../../view/Podcast.view';

@Controller('podcast')
export default class PodcastController {
  constructor(
    @Inject('CreatePodcastService')
    private createPodcastService: CreatePodcastService,

    @Inject('IndexUserPodcastsService')
    private indexUserPodcastsService: IndexUserPodcastsService,

    @Inject('ShowPodcastService')
    private showPodcastService: ShowPodcastService,

    @Inject('IndexPodcastsService')
    private indexPodcastsService: IndexPodcastsService,

    @Inject('IndexPodcastsSpotlightsService')
    private indexPodcastsSpotlightsService: IndexPodcastsSpotlightsService,

    @Inject('RemovePodcastService')
    private removePodcastService: RemovePodcastService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('cover', multerOptions))
  public async create(
    @Body(ValidationPipe) { title, description }: PodcastDTO,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const id = req.user.id;
    const podcast = await this.createPodcastService.execute({
      cover: file.filename,
      title,
      description,
      authorId: id,
    });

    return podcast;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  public async indexByUser(@Request() req: any) {
    const id = req.user.id;
    const podcasts = await this.indexUserPodcastsService.execute(id);

    if (podcasts) {
      const podcastsView = new PodcastView().renderMany(podcasts);
      return podcastsView;
    }

    return podcasts;
  }

  @Get('podcaster/:id')
  @UseGuards(JwtAuthGuard)
  public async findByUser(@Param('id') id: string) {
    const podcasts = await this.indexUserPodcastsService.execute(id);

    if (podcasts) {
      const podcastsView = new PodcastView().renderMany(podcasts);
      return podcastsView;
    }

    return podcasts;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id') id: string) {
    try {
      const podcast = await this.showPodcastService.execute(id);

      if (podcast) {
        const podcastsView = new PodcastView().render(podcast);
        return podcastsView;
      }

      return podcast;
    } catch (error) {
      throw new InternalServerErrorException('');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async index() {
    try {
      const podcasts = await this.indexPodcastsService.execute();

      if (podcasts) {
        const podcastsView = new PodcastView().renderMany(podcasts);
        return podcastsView;
      }

      return podcasts;
    } catch (error) {
      throw new InternalServerErrorException('');
    }
  }

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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async remove(@Param('id') id: string) {
    const podcast = await this.removePodcastService.execute(id);

    return { id: podcast.id };
  }
}
