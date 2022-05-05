import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/infra/prisma/Prisma.service';
import EpisodeController from './infra/http/Episode.controller';
import PodcastController from './infra/http/Podcast.controller';
import EpisodeRepository from './infra/prisma/repositories/EpisodeRepository';
import PodcastRepository from './infra/prisma/repositories/PodcastRepository';
import CreateEpisodeService from './services/CreateEpisode.service';
import CreatePodcastService from './services/CreatePodcast.service';
import IndexUserPodcastsService from './services/IndexUserPodcasts.service';

@Module({
  imports: [
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [PodcastController, EpisodeController],
  providers: [
    PrismaService,
    {
      provide: 'CreatePodcastService',
      useClass: CreatePodcastService,
    },
    {
      provide: 'CreateEpisodeService',
      useClass: CreateEpisodeService,
    },
    {
      provide: 'IndexUserPodcastsService',
      useClass: IndexUserPodcastsService,
    },
    {
      provide: 'PodcastRepository',
      useClass: PodcastRepository,
    },
    {
      provide: 'EpisodeRepository',
      useClass: EpisodeRepository,
    },
  ],
})
export class PodcastModule {}
