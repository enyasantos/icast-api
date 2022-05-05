import { Inject, Injectable } from '@nestjs/common';
import AuthenticationRepository from '../infra/prisma/repositories/AuthenticationRepository';

@Injectable()
export default class UserSessionService {
  constructor(
    @Inject('AuthenticationRepository')
    private readonly authRepository: AuthenticationRepository,
  ) {}

  public async execute(id: string) {
    const user = await this.authRepository.findUserById(id);

    delete user.password;

    return user;
  }
}
