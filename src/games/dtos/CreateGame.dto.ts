import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
