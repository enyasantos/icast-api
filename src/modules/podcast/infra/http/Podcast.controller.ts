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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import { PodcastDTO } from '../../dto/PodcastDTO';
import CreatePodcastService from '../../services/CreatePodcast.service';
import IndexUserPodcastsService from '../../services/IndexUserPodcasts.service';
import { multerOptions } from '../../utils/multerConfigCoverPodcast';

@Controller('podcast')
export default class PodcastController {
  constructor(
    @Inject('CreatePodcastService')
    private createPodcastService: CreatePodcastService,

    @Inject('IndexUserPodcastsService')
    private indexUserPodcastsService: IndexUserPodcastsService,
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('cover', multerOptions))
  @UseGuards(JwtAuthGuard)
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

    return podcasts;
  }

  @Get('podcaster')
  @UseGuards(JwtAuthGuard)
  public async findByUser(@Param() id: string) {
    const podcasts = await this.indexUserPodcastsService.execute(id);

    return podcasts;
  }
}
