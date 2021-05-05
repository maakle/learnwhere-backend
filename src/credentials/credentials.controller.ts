import { Controller, Get, Render, Req } from '@nestjs/common';
import { IssuerService } from '../issuer/issuer.service';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly issuanceService: IssuerService) {}

  @Get('issue')
  @Render('credentials/issue')
  renderIssuance() {
    return;
  }
}
