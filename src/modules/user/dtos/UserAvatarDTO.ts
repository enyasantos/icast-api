import { IsString } from 'class-validator';

export class UserAvatarDTO {
  @IsString()
  filename: string;

  @IsString()
  userId: string;
}
