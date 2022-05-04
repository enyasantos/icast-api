import { Controller, Inject, Get } from '@nestjs/common';
import IndexAccountsService from '../../services/IndexAccounts.service';

@Controller('user')
export default class IndexAccountsController {
  constructor(
    @Inject('IndexAccountsService')
    private indexAccountsService: IndexAccountsService,
  ) {}

  @Get()
  public async index() {
    const users = await this.indexAccountsService.execute();

    return users;
  }
}
