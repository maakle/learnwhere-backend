import { Injectable } from '@nestjs/common';
import { CreateVerifierDto } from './dto/create-verifier.dto';
import { UpdateVerifierDto } from './dto/update-verifier.dto';

@Injectable()
export class VerifierService {
  create(createVerifierDto: CreateVerifierDto) {
    return 'This action adds a new verifier';
  }

  renderVerifier() {
    return { message: 'AAAA' };
  }

  findOne(id: number) {
    return `This action returns a #${id} verifier`;
  }

  update(id: number, updateVerifierDto: UpdateVerifierDto) {
    return `This action updates a #${id} verifier`;
  }

  remove(id: number) {
    return `This action removes a #${id} verifier`;
  }
}
