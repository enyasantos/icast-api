import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/shared/infra/prisma/Prisma.service';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './infra/http/Authentication.controller';
import AuthenticationRepository from './infra/prisma/repositories/AuthenticationRepository';
import AuthenticationService from './services/Authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
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
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
