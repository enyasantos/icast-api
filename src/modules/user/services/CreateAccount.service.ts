import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAccountDTO } from '../dtos/UserAccountDTO';
import UserAccountRepository from '../infra/prisma/repositories/UserAccountRepository';

@Injectable()
export default class CreateAccountService {
  constructor(
    @Inject('UserAccountRepository')
    private readonly userRepository: UserAccountRepository,

    private readonly jwtService: JwtService,
  ) {}

  public async execute(userdata: UserAccountDTO) {
    const userExists = await this.userRepository.findByEmail(userdata.email);

    if (userExists) throw new ConflictException('User already exists');

    const user = await this.userRepository.create(userdata);

    if (!user) return new BadRequestException('Erro on create user');

    const payload = {
      sub: user.id,
      email: user.email,
    };

    delete user.password;

    return { user, token: this.jwtService.sign(payload) };
  }
}
