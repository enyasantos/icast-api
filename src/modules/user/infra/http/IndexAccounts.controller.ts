import { Controller, Inject, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import IndexAccountsService from '../../services/IndexAccounts.service';

@Controller('user')
export default class IndexAccountsController {
  constructor(
    @Inject('IndexAccountsService')
    private indexAccountsService: IndexAccountsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async index() {
    const users = await this.indexAccountsService.execute();

    return users;
  }
}
