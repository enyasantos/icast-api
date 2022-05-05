import { Inject, Injectable } from '@nestjs/common';
import UserAccountRepository from '../infra/prisma/repositories/UserAccountRepository';

@Injectable()
export default class ShowAccountService {
  constructor(
    @Inject('UserAccountRepository')
    private readonly userRepository: UserAccountRepository,
  ) {}

  public async execute(id: string) {
    const users = await this.userRepository.show(id);

    return users;
  }
}
