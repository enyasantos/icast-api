import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
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
    const user = await this.authRepository.logon({ email, password });

    if (user) {
      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) return null;
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    delete user.password;

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
