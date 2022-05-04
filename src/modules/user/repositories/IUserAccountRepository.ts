import { User } from '.prisma/client';
import { Avatar } from '@prisma/client';
import { UserAccountDTO } from '../dtos/UserAccountDTO';
import { UserAvatarDTO } from '../dtos/UserAvatarDTO';

export interface IUserAccountRepository {
  create(data: UserAccountDTO): Promise<User>;
  index(): Promise<User[]>;
  show(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  addAvatar(data: UserAvatarDTO): Promise<Avatar>;
}
