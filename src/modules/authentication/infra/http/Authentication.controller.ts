import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthDTO } from '../../dtos/AuthDTO';
import AuthenticationService from '../../services/Authentication.service';

@Controller('session')
export class AuthenticationController {
  constructor(
    @Inject('AuthenticationService')
    private readonly authService: AuthenticationService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async logon(@Body(ValidationPipe) userdata: AuthDTO) {
    const user = await this.authService.execute(userdata);

    return user;
  }
}
