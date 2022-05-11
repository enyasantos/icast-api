import {
  Controller,
  Inject,
  UseGuards,
  Request,
  Patch,
  Get,
} from '@nestjs/common';
import { Role } from 'src/modules/authentication/config/role.enum';
import { Roles } from 'src/modules/authentication/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/authentication/guards/roles.guard';
import { JwtAuthGuard } from 'src/shared/guard/JWTAuth.guard';
import DowngradeAccountService from '../../services/DowngradeAccount.service';
import ShowAccountService from '../../services/ShowAccont.service';
import UpgradeAccountService from '../../services/UpgradeAccount.service';

@Controller('user/role')
export default class RoleAccountController {
  constructor(
    @Inject('UpgradeAccountService')
    private readonly upgradeAccountService: UpgradeAccountService,

    @Inject('DowngradeAccountService')
    private readonly downgradeAccountService: DowngradeAccountService,

    @Inject('ShowAccountService')
    private readonly showAccountService: ShowAccountService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch('upgrade')
  public async upgrade(@Request() req: any) {
    const id = req.user.id;
    const user = await this.upgradeAccountService.execute(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch('downgrade')
  public async downgrade(@Request() req: any) {
    const id = req.user.id;
    const user = await this.downgradeAccountService.execute(id);
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  public async show(@Request() req: any) {
    const id = req.user.id;
    const user = await this.showAccountService.execute(id);
    return {
      role: user.role,
    };
  }
}
