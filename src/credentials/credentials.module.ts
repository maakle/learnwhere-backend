import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialRepository } from './credential.repository';
import { IssuerModule } from '../issuer/issuer.module';

@Module({
  imports: [TypeOrmModule.forFeature([CredentialRepository]), IssuerModule],
  controllers: [CredentialsController],
  providers: [CredentialsService],
})
export class CredentialsModule {}
