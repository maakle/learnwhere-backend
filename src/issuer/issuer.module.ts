import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IssuerService } from './issuer.service';
import { IssuerController } from './issuer.controller';
import { ClientSecretCredential } from '@azure/identity';
import { KeyReference } from 'verifiablecredentials-verification-sdk-typescript';

@Module({
  imports: [ConfigModule],
  controllers: [IssuerController],
  providers: [IssuerService, ClientSecretCredential, KeyReference],
})
export class IssuerModule {}
