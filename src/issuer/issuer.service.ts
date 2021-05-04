import { Injectable } from '@nestjs/common';
import { CreateIssuerDto } from './dto/create-issuer.dto';
import { UpdateIssuerDto } from './dto/update-issuer.dto';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class IssuerService {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // init
  }

  async createIssueRequest(req: Request) {
    return null;
  }
}
