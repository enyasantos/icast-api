import { Controller, Inject, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import IndexAccountsService from '../../services/IndexAccounts.service';

@Controller('user')
export default class IndexAccountsController {
  constructor(
    @Inject('IndexAccountsService')
    private indexAccountsService: IndexAccountsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async index() {
    const users = await this.indexAccountsService.execute();

    return users;
  }
}
