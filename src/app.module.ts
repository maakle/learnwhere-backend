import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { IssuerModule } from './issuer/issuer.module';
import { VerifierModule } from './verifier/verifier.module';
import { CredentialsModule } from './credentials/credentials.module';

import didConfig from '../config/didConfig';
import expertCredential from '../config/credentials/expertCredential';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [didConfig, expertCredential],
    }),
    DatabaseModule,
    CredentialsModule,
    IssuerModule,
    VerifierModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
