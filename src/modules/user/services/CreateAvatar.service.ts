import { Inject, Injectable } from '@nestjs/common';
import UserAccountRepository from '../infra/prisma/repositories/UserAccountRepository';

@Injectable()
export default class CreateAvatarService {
  constructor(
    @Inject('UserAccountRepository')
    private readonly userRepository: UserAccountRepository,
  ) {}

  public async execute(userId: string, filename: string) {
    const avatar = await this.userRepository.addAvatar({
      filename,
      userId,
    });

    return avatar;
  }
}
