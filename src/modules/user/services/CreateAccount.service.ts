import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserAccountDTO } from '../dtos/UserAccountDTO';
import UserAccountRepository from '../infra/prisma/repositories/UserAccountRepository';

@Injectable()
export default class CreateAccountService {
  constructor(
    @Inject('UserAccountRepository')
    private readonly userRepository: UserAccountRepository,
  ) {}

  public async execute(userdata: UserAccountDTO) {
    const userExists = await this.userRepository.findByEmail(userdata.email);

    if (userExists) throw new BadRequestException('User already exists');

    const userCreated = await this.userRepository.create(userdata);

    return { user: userCreated };
  }
}
