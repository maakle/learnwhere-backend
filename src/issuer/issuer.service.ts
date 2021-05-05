import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommonNetworkMember } from '@affinidi/wallet-core-sdk';
import UnsignedVcDto from './dto/UnsignedVc.dto';
import UnsignedVC from './entities/unsignedVC.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IssuerService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UnsignedVC)
    private unsignedVcRepository: Repository<UnsignedVC>,
  ) {}

  async onModuleInit() {
    // const options = {
    //   issuerUrl: 'https://affinity-issuer.staging.affinity-project.org',
    //   apiKey: '3815582b-ebe0-40d0-9901-b6680bfd8e3c',
    // };
    // const seed = await CommonNetworkMember.generateSeed('elem');
    // const seedHex = seed.toString('hex');
    // const seedWithMethod = `${seedHex}++${'elem'}`;
    // const affinidiClient = await CommonNetworkMember.fromSeed(
    //   seedHex,
    //   options,
    //   'secrurePassword123@#$%^&',
    // );
    // const { did, encryptedSeed } = await CommonNetworkMember.register(
    //   'secrurePassword123@#$%^&',
    //   options,
    // );
    // console.log('did ', did);
    // console.log('encryptedSeed ', encryptedSeed);
  }

  async buildUnsignedVc(unsignedVcData: UnsignedVcDto) {
    // TODO save to Affinidi

    const unsignVC = this.unsignedVcRepository.create(unsignedVcData);
    await this.unsignedVcRepository.save(unsignVC);
    return unsignVC;
  }
}
