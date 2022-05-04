import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserAccountDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
