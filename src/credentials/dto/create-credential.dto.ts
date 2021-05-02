import { IsNotEmpty } from 'class-validator';

export class CreateCredentialDto {
  @IsNotEmpty()
  url: string;
}
