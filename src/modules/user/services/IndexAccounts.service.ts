import { Inject, Injectable } from '@nestjs/common';
import UserAccountRepository from '../infra/prisma/repositories/UserAccountRepository';

@Injectable()
export default class IndexAccountsService {
  constructor(
    @Inject('UserAccountRepository')
    private readonly userRepository: UserAccountRepository,
  ) {}

  public async execute() {
    const users = await this.userRepository.index();

    return users;
  }
}
