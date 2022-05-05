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
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import { EpisodeDTO } from '../../dto/EpisodeDTO';
import CreateEpisodeService from '../../services/CreateEpisode.service';
import { multerOptions } from '../../utils/multerConfigEpisode';

@Controller('episode')
export default class EpisodeController {
  constructor(
    @Inject('CreateEpisodeService')
    private createEpisodeService: CreateEpisodeService,
  ) {}

  @Post('create')
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
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body(ValidationPipe) { title, description, podcastId }: EpisodeDTO,
    @Request() req: any,
    @UploadedFiles()
    files: { cover?: Express.Multer.File[]; episode?: Express.Multer.File[] },
  ) {
    const user = await this.createEpisodeService.execute({
      cover: files.cover[0].filename,
      title,
      description,
      file: files.episode[0].filename,
      podcastId,
    });

    return user;
  }
}
