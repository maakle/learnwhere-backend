import { Injectable } from '@nestjs/common';
import { CreateIssuerDto } from './dto/create-issuer.dto';
import { UpdateIssuerDto } from './dto/update-issuer.dto';

@Injectable()
export class IssuerService {
  create(createIssuerDto: CreateIssuerDto) {
    return 'This action adds a new issuer';
  }

  renderIssuance() {
    return { message: 'success' };
  }

  findOne(id: number) {
    return `This action returns a #${id} issuer`;
  }

  update(id: number, updateIssuerDto: UpdateIssuerDto) {
    return `This action updates a #${id} issuer`;
  }

  remove(id: number) {
    return `This action removes a #${id} issuer`;
  }
}
