import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IssuerService } from './issuer.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [IssuerService],
  exports: [IssuerService],
})
export class IssuerModule {}
