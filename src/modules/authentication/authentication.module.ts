import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/infra/prisma/Prisma.service';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './infra/http/Authentication.controller';
import AuthenticationRepository from './infra/prisma/repositories/AuthenticationRepository';
import AuthenticationService from './services/Authentication.service';
import UserSessionService from './services/UserSession.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'AuthenticationService',
      useClass: AuthenticationService,
    },
    {
      provide: 'AuthenticationRepository',
      useClass: AuthenticationRepository,
    },
    {
      provide: 'UserSessionService',
      useClass: UserSessionService,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
