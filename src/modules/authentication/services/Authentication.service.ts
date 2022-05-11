import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from '../dtos/AuthDTO';
import AuthenticationRepository from '../infra/prisma/repositories/AuthenticationRepository';

@Injectable()
export default class AuthenticationService {
  constructor(
    @Inject('AuthenticationRepository')
    private readonly authRepository: AuthenticationRepository,

    private readonly jwtService: JwtService,
  ) {}

  public async execute({ email, password }: AuthDTO) {
    const user = await this.authRepository.validateUser({ email, password });

    if (!user) return null;

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    delete user.password;

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
