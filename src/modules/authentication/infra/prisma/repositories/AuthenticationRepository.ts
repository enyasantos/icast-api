import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infra/prisma/Prisma.service';
import { IAuthenticationRepository } from 'src/modules/authentication/repositories/IAuthenticationRepository';
import { AuthDTO } from 'src/modules/authentication/dtos/AuthDTO';
import { PrismaClient, User } from '@prisma/client';
import { compareSync } from 'bcrypt';

@Injectable()
export default class AuthenticationRepository
  implements IAuthenticationRepository
{
  constructor(
    @Inject(PrismaService)
    private readonly ormRepository: PrismaClient,
  ) {}

  public async validateUser({ email, password }: AuthDTO): Promise<User> {
    const user = await this.ormRepository.user.findUnique({
      where: { email },
    });

    if (user) {
      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) return null;
    }

    return user;
  }

  public async findUserById(id: string): Promise<User> {
    const user = await this.ormRepository.user.findUnique({
      where: { id },
    });

    return user;
  }
}
