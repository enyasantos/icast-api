import { Controller, Inject, Get, UseGuards } from '@nestjs/common';
import { Role } from 'src/modules/authentication/config/role.enum';
import { Roles } from 'src/modules/authentication/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/authentication/guards/roles.guard';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import IndexAccountsService from '../../services/IndexAccounts.service';

@Controller('user')
export default class IndexAccountsController {
  constructor(
    @Inject('IndexAccountsService')
    private indexAccountsService: IndexAccountsService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  public async index() {
    const users = await this.indexAccountsService.execute();

    return users;
  }
}
