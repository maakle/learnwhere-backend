import { Body, Controller, Get, Post, Render, Req } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import ToBeSignedDto from './dto/ToBeSigned.dto';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Get('issue')
  @Render('credentials/issue')
  renderIssuance() {
    return;
  }

  @Post('sign-vc')
  signVC(@Req() @Body() toBeSigned: ToBeSignedDto) {
    return this.credentialsService.signCredential(toBeSigned);
  }
}
