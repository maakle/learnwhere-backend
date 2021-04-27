import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuerModule } from './issuer/issuer.module';
import { VerifierModule } from './verifier/verifier.module';

@Module({
  imports: [IssuerModule, VerifierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
