import { Inject, Injectable } from '@nestjs/common';
import { Avatar, PrismaClient, User } from '@prisma/client';
import { UserAccountDTO } from 'src/modules/user/dtos/UserAccountDTO';
import { PrismaService } from '../../../../../shared/infra/prisma/Prisma.service';
import * as bcrypt from 'bcrypt';
import { IUserAccountRepository } from 'src/modules/user/repositories/IUserAccountRepository';
import { UserAvatarDTO } from 'src/modules/user/dtos/UserAvatarDTO';

@Injectable()
export default class UserAccountRepository implements IUserAccountRepository {
  constructor(
    @Inject(PrismaService)
    private readonly ormRepository: PrismaClient,
  ) {}

  public async create({
    email,
    firstName,
    lastName,
    password,
    city,
    state,
  }: UserAccountDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.ormRepository.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        city,
        state,
      },
    });

    return user;
  }

  public async addAvatar({ filename, userId }: UserAvatarDTO): Promise<Avatar> {
    const avatar = await this.ormRepository.avatar.create({
      data: {
        userId,
        filename,
      },
    });

    return avatar;
  }

  public async index(): Promise<User[]> {
    const user = await this.ormRepository.user.findMany();

    return user;
  }

  public async show(id: string): Promise<User> {
    const user = await this.ormRepository.user.findUnique({
      where: { id },
      include: {
        podcasts: true,
        avatar: true,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.user.findUnique({
      where: { email },
    });

    return user;
  }

  public async upgradeAccount(id: string): Promise<User> {
    const userUpdated = await this.ormRepository.user.update({
      where: { id },
      data: {
        role: 'PODCASTER',
      },
    });

    return userUpdated;
  }

  public async downgradeAccount(id: string): Promise<User> {
    const userUpdated = await this.ormRepository.user.update({
      where: { id },
      data: {
        role: 'DEFAULT_USER',
      },
    });

    return userUpdated;
  }
}
