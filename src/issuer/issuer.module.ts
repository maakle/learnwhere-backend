import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IssuerService } from './issuer.service';
import { IssuerController } from './issuer.controller';

@Module({
  imports: [ConfigModule],
  controllers: [IssuerController],
  providers: [IssuerService],
})
export class IssuerModule {}
