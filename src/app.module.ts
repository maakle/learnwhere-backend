import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { IssuerModule } from './issuer/issuer.module';
import { VerifierModule } from './verifier/verifier.module';

import didConfig from '../config/didConfig';
import expertCredential from '../config/credentials/expertCredential';

@Module({
  imports: [
    IssuerModule,
    VerifierModule,
    ConfigModule.forRoot({
      load: [didConfig, expertCredential],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
