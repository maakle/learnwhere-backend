import { Controller, Req, Post, Body } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import UnsignedVcDto from './dto/UnsignedVc.dto';

@Controller('issuer')
export class IssuerController {
  constructor(private readonly issuanceService: IssuerService) {}

  @Post('build-unsigned-vc')
  buildUnsignedVc(@Req() @Body() unsignedVc: UnsignedVcDto) {
    return this.issuanceService.buildUnsignedVc(unsignedVc);
  }
}
