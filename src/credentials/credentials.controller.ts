import { Controller, Get, Render, Req } from '@nestjs/common';
import { IssuerService } from '../issuer/issuer.service';
import { Request } from 'express';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly issuanceService: IssuerService) {}

  @Get('issue-request')
  @Render('credentials/issue-request')
  renderIssuance() {
    return;
  }

  @Get('create-issue-request')
  createIssueRequest(@Req() request: Request) {
    return this.issuanceService.createIssueRequest(request);
  }
}
