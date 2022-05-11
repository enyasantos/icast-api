import {
  ForbiddenException,
  Inject,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/shared/infra/prisma/Prisma.service';

@Injectable()
export class UserIsOwnerEpisodeMiddleware implements NestMiddleware {
  constructor(
    @Inject(PrismaService)
    private readonly ormRepository: PrismaClient,

    private readonly jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { id: paramsId } = req.params;
    const { authorization } = req.headers;

    if (!authorization) throw new ForbiddenException('');

    try {
      const token = authorization.replace('Bearer', '').trim();
      const data = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      const { sub: id, role } = data;

      if (role !== 'ADMIN') {
        const episode = await this.ormRepository.episode.findFirst({
          where: {
            id: paramsId,
          },
        });

        if (!episode) throw new NotFoundException('Episode not found');

        if (episode) {
          const podcast = await this.ormRepository.podcast.findFirst({
            where: {
              id: episode.podcastId,
              authorId: id,
            },
          });

          if (!podcast)
            throw new ForbiddenException('This content is not the user');
        }
      }

      next();
    } catch (error) {
      throw new ForbiddenException('');
    }
  }
}
