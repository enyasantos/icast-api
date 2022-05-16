import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import { LocalAuthGuard } from 'src/shared/guard/LocalAuth.guard';
import { AuthDTO } from '../../dtos/AuthDTO';
import AuthenticationService from '../../services/Authentication.service';
import UserSessionService from '../../services/UserSession.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject('AuthenticationService')
    private readonly authService: AuthenticationService,

    @Inject('UserSessionService')
    private readonly userSessionService: UserSessionService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async logon(@Body(ValidationPipe) userdata: AuthDTO) {
    const user = await this.authService.execute(userdata);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('session')
  async session(@Request() req: any) {
    const id = req.user.id;
    const user = await this.userSessionService.execute(id);
    return user;
  }
}
