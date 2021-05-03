import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IssuerService } from './issuer.service';
import { ClientSecretCredential } from '@azure/identity';
import { KeyReference } from 'verifiablecredentials-verification-sdk-typescript';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [IssuerService, ClientSecretCredential, KeyReference],
  exports: [IssuerService],
})
export class IssuerModule {}
