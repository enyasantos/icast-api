import { User } from '.prisma/client';
import { AuthDTO } from '../dtos/AuthDTO';

export interface IAuthenticationRepository {
  validateUser({ email, password }: AuthDTO): Promise<User>;
  findUserById(id: string): Promise<User>;
}
