import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PodcastModule } from './modules/podcast/podcast.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { PrismaService } from './shared/infra/prisma/Prisma.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserIsOwnerPodcastMiddleware } from './middleware/UserIsOwnerPodcast.middleware';
import { UserIsOwnerEpisodeMiddleware } from './middleware/UserIsOwnerEpisode.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PodcastModule,
    AuthenticationModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIsOwnerPodcastMiddleware).forRoutes(
      {
        path: 'podcast/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: 'episode/create/:id',
        method: RequestMethod.POST,
      },
    );
    consumer.apply(UserIsOwnerEpisodeMiddleware).forRoutes({
      path: 'episode/:id',
      method: RequestMethod.DELETE,
    });
  }
}
