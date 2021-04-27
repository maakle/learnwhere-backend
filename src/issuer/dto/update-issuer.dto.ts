import { PartialType } from '@nestjs/mapped-types';
import { CreateIssuerDto } from './create-issuer.dto';

export class UpdateIssuerDto extends PartialType(CreateIssuerDto) {}
