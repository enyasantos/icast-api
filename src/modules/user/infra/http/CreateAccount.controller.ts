import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { UserAccountDTO } from '../../dtos/UserAccountDTO';
import CreateAccountService from '../../services/CreateAccount.service';

@Controller('user')
export default class CreateAccountController {
  constructor(
    @Inject('CreateAccountService')
    private createUserService: CreateAccountService,
  ) {}

  @Post('create')
  public async create(@Body(ValidationPipe) userdata: UserAccountDTO) {
    const user = await this.createUserService.execute(userdata);

    return user;
  }
}
