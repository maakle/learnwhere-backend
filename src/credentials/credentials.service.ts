import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Credential from './entities/credential.entity';
import { Repository } from 'typeorm';
import ToBeSignedDto from './dto/ToBeSigned.dto';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}

  async signCredential(toBeSigned: ToBeSignedDto): Promise<Credential> {
    console.log('called');

    // Get credentia, sign and save to DB

    const newSignedCredential = new Credential();
    newSignedCredential.credential = toBeSigned.unsignedCredential;
    await this.credentialRepository.save(newSignedCredential);

    return newSignedCredential;
  }
}
