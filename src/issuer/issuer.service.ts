import { Injectable } from '@nestjs/common';
import { CreateIssuerDto } from './dto/create-issuer.dto';
import { UpdateIssuerDto } from './dto/update-issuer.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IssuerService {
  create(createIssuerDto: CreateIssuerDto, conService: ConfigService) {
    const test = conService.get<string>('credentialType');
    console.log('biatch ', test);

    return 'This action adds a new issuer';
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} issuer`;
  // }

  // update(id: number, updateIssuerDto: UpdateIssuerDto) {
  //   return `This action updates a #${id} issuer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} issuer`;
  // }
}
