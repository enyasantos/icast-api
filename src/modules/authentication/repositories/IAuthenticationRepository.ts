import { User } from '.prisma/client';
import { AuthDTO } from '../dtos/AuthDTO';

export interface IAuthenticationRepository {
  logon({ email, password }: AuthDTO): Promise<User>;
}
