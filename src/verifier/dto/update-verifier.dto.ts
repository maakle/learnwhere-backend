import { PartialType } from '@nestjs/mapped-types';
import { CreateVerifierDto } from './create-verifier.dto';

export class UpdateVerifierDto extends PartialType(CreateVerifierDto) {}
