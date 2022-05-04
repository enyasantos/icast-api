import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PodcastModule } from './modules/podcast/podcast.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { PrismaService } from './shared/infra/prisma/Prisma.service';

@Module({
  imports: [UserModule, PodcastModule, AuthenticationModule],
  providers: [PrismaService],
})
export class AppModule {}
