import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from './entities/credential.entity';
import { CredentialRepository } from './credential.repository';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: CredentialRepository,
  ) {}

  async create(createCredentialDto: CreateCredentialDto): Promise<Credential> {
    return this.credentialRepository.createCredential(createCredentialDto);
  }
}
