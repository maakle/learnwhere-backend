import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { IssuerModule } from './issuer/issuer.module';
import { CredentialsModule } from './credentials/credentials.module';
import { UsersModule } from './users/users.module';

import didConfig from '../config/didConfig';
import expertCredential from '../config/credentials/expertCredential';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({
      load: [didConfig, expertCredential],
      isGlobal: true,
    }),
    DatabaseModule,
    CredentialsModule,
    IssuerModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
