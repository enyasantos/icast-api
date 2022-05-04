import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import CreateAvatarService from '../../services/CreateAvatar.service';
import { multerOptions } from '../../utils/multerConfigAvatar';

@Controller('user')
export default class CreateAvatarController {
  constructor(
    @Inject('CreateAvatarService')
    private createUserService: CreateAvatarService,
  ) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  public async create(
    @Body(ValidationPipe) { userId }: { userId: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.createUserService.execute(userId, file.filename);

    return user;
  }
}
