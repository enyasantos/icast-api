import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/shared/infra/prisma/Prisma.service';
import CreateAccountController from './infra/http/CreateAccount.controller';
import CreateAvatarController from './infra/http/CreateAvatar.controller';
import IndexAccountsController from './infra/http/IndexAccounts.controller';
import RoleAccountController from './infra/http/RoleAccount.controller';
import UserAccountRepository from './infra/prisma/repositories/UserAccountRepository';
import CreateAccountService from './services/CreateAccount.service';
import CreateAvatarService from './services/CreateAvatar.service';
import DowngradeAccountService from './services/DowngradeAccount.service';
import IndexAccountsService from './services/IndexAccounts.service';
import ShowAccountService from './services/ShowAccont.service';
import UpgradeAccountService from './services/UpgradeAccount.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    CreateAccountController,
    CreateAvatarController,
    IndexAccountsController,
    RoleAccountController,
  ],
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
      provide: 'IndexAccountsService',
      useClass: IndexAccountsService,
    },
    {
      provide: 'UpgradeAccountService',
      useClass: UpgradeAccountService,
    },
    {
      provide: 'DowngradeAccountService',
      useClass: DowngradeAccountService,
    },
    {
      provide: 'ShowAccountService',
      useClass: ShowAccountService,
    },
    {
      provide: 'UserAccountRepository',
      useClass: UserAccountRepository,
    },
  ],
})
export class UserModule {}
