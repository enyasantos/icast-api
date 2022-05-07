import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/infra/prisma/Prisma.service';
import EpisodeController from './infra/http/Episode.controller';
import PodcastController from './infra/http/Podcast.controller';
import PodcastSpotlightsController from './infra/http/PodcastSpotlights.controller';
import EpisodeRepository from './infra/prisma/repositories/EpisodeRepository';
import PodcastRepository from './infra/prisma/repositories/PodcastRepository';
import CreateEpisodeService from './services/CreateEpisode.service';
import CreatePodcastService from './services/CreatePodcast.service';
import IndexPodcastsService from './services/IndexPodcasts.service';
import IndexPodcastsSpotlightsService from './services/IndexPodcastsSpotlights.service';
import IndexUserPodcastsService from './services/IndexUserPodcasts.service';
import RemoveEpisodeService from './services/RemoveEpisode.service';
import RemovePodcastService from './services/RemovePodcast.service';
import ShowEpisodeService from './services/ShowEpisode.service';
import ShowPodcastService from './services/ShowPodcast.service';

@Module({
  imports: [
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    PodcastController,
    EpisodeController,
    PodcastSpotlightsController,
  ],
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
      provide: 'ShowPodcastService',
      useClass: ShowPodcastService,
    },
    {
      provide: 'ShowEpisodeService',
      useClass: ShowEpisodeService,
    },
    {
      provide: 'IndexPodcastsService',
      useClass: IndexPodcastsService,
    },
    {
      provide: 'IndexPodcastsSpotlightsService',
      useClass: IndexPodcastsSpotlightsService,
    },
    {
      provide: 'RemovePodcastService',
      useClass: RemovePodcastService,
    },
    {
      provide: 'RemoveEpisodeService',
      useClass: RemoveEpisodeService,
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
