import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';

import { IssuerService } from './issuer.service';

@Controller('issuer')
export class IssuerController {
  constructor(private readonly issuerService: IssuerService) {}

  @Get()
  @Render('issuer/index')
  renderIssuance() {
    return;
  }

  @Get('create-request')
  create(@Req() request: Request) {
    return this.issuerService.createIssueRequest(request);
  }
}
