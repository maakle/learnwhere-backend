import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import CreateUserDto from './dto/createUser.dto';
import { CommonNetworkMember } from '@affinidi/wallet-core-sdk';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    //   '230fb20fb2f08b23',
    // );
    // const { did, encryptedSeed } = await CommonNetworkMember.register(
    //   '230fb20fb2f08b23',
    //   options,
    // );
    // console.log('did ', did);
    // console.log('encryptedSeed ', encryptedSeed);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async createUser(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
