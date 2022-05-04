import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma/Prisma.service';
import CreateAccountController from './infra/http/CreateAccount.controller';
import CreateAvatarController from './infra/http/CreateAvatar.controller';
import UserAccountRepository from './infra/prisma/repositories/UserAccountRepository';
import CreateAccountService from './services/CreateAccount.service';
import CreateAvatarService from './services/CreateAvatar.service';

@Module({
  imports: [],
  controllers: [CreateAccountController, CreateAvatarController],
  providers: [
    PrismaService,
    {
      provide: 'CreateAccountService',
      useClass: CreateAccountService,
    },
    {
      provide: 'CreateAvatarService',
      useClass: CreateAvatarService,
    },
    {
      provide: 'UserAccountRepository',
      useClass: UserAccountRepository,
    },
  ],
})
export class UserModule {}
