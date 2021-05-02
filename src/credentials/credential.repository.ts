import { EntityRepository, Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Credential)
export class CredentialRepository extends Repository<Credential> {
  async createCredential(
    createCredentialDto: CreateCredentialDto,
  ): Promise<Credential> {
    const { url } = createCredentialDto;

    const credential = new Credential();
    credential.url = url;

    try {
      await credential.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return credential;
  }
}
