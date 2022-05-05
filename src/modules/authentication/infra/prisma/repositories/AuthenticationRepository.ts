import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infra/prisma/Prisma.service';
import { IAuthenticationRepository } from 'src/modules/authentication/repositories/IAuthenticationRepository';
import { AuthDTO } from 'src/modules/authentication/dtos/AuthDTO';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export default class AuthenticationRepository
  implements IAuthenticationRepository
{
  constructor(
    @Inject(PrismaService)
    private readonly ormRepository: PrismaClient,
  ) {}

  public async logon({ email }: AuthDTO): Promise<User> {
    const user = await this.ormRepository.user.findUnique({
      where: { email },
    });

    return user;
  }
}
