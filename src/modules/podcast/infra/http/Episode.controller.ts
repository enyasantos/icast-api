import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  UseInterceptors,
  UploadedFiles,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import { EpisodeDTO } from '../../dto/EpisodeDTO';
import CreateEpisodeService from '../../services/CreateEpisode.service';
import RemoveEpisodeService from '../../services/RemoveEpisode.service';
import ShowEpisodeService from '../../services/ShowEpisode.service';
import { multerOptions } from '../../utils/multerConfigEpisode';
import { EpisodeView } from '../../view/Episode.view';

@Controller('episode')
export default class EpisodeController {
  constructor(
    @Inject('CreateEpisodeService')
    private createEpisodeService: CreateEpisodeService,

    @Inject('ShowEpisodeService')
    private showEpisodeService: ShowEpisodeService,

    @Inject('RemoveEpisodeService')
    private removeEpisodeService: RemoveEpisodeService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'cover',
          maxCount: 1,
        },
        {
          name: 'episode',
          maxCount: 1,
        },
      ],
      multerOptions,
    ),
  )
  public async create(
    @Body(ValidationPipe) { title, description, podcastId }: EpisodeDTO,
    @Request() req: any,
    @UploadedFiles()
    files: { cover?: Express.Multer.File[]; episode?: Express.Multer.File[] },
  ) {
    const episode = await this.createEpisodeService.execute({
      cover: files.cover[0].filename,
      title,
      description,
      file: files.episode[0].filename,
      podcastId,
    });

    if (episode) {
      return new EpisodeView().render(episode);
    }

    return episode;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id') id: string) {
    const episode = await this.showEpisodeService.execute(id);

    if (episode) {
      return new EpisodeView().render(episode);
    }

    return episode;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async remove(@Param('id') id: string) {
    const episode = await this.removeEpisodeService.execute(id);

    return { id: episode.id };
  }
}
