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
export class UserIsOwnerPodcastMiddleware implements NestMiddleware {
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
      const { sub: userId, role } = data;

      const podcast = await this.ormRepository.podcast.findFirst({
        where: {
          id: paramsId,
        },
      });

      if (!podcast) throw new NotFoundException('Episode not found');

      if (role !== 'ADMIN' && podcast.authorId !== userId)
        throw new ForbiddenException('This content is not the user');

      next();
    } catch (_) {
      throw new ForbiddenException('');
    }
  }
}
