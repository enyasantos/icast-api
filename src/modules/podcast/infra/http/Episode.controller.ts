import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/modules/authentication/config/role.enum';
import { Roles } from 'src/modules/authentication/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/authentication/guards/roles.guard';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import { DeleteFile } from 'src/utils/removeFile';
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

  @Post('create/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Podcaster)
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
    @Body(ValidationPipe)
    { title, description }: { title: string; description: string },
    @Param('id') id: string,
    @UploadedFiles()
    files: { cover?: Express.Multer.File[]; episode?: Express.Multer.File[] },
  ) {
    try {
      const episode = await this.createEpisodeService.execute({
        cover: files.cover[0].filename,
        title,
        description,
        file: files.episode[0].filename,
        podcastId: id,
      });

      if (episode) {
        return new EpisodeView().render(episode);
      }

      return episode;
    } catch (error) {
      console.error(error);
      //DeleteFile(`public/podcast/cover/${files.cover[0].filename}`);
      //DeleteFile(`public/episode/file/${files.episode[0].filename}`);
    }
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Podcaster, Role.Admin)
  public async remove(@Param('id') id: string) {
    const episode = await this.removeEpisodeService.execute(id);

    if (episode) {
      DeleteFile(`public/podcast/cover/${episode.cover}`);
      DeleteFile(`public/episode/file/${episode.file}`);
    }

    return { id: episode.id };
  }
}
