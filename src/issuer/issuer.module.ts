import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IssuerService } from './issuer.service';
import { IssuerController } from './issuer.controller';
import UnsignedVC from './entities/unsignedVC.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UnsignedVC])],
  controllers: [IssuerController],
  providers: [IssuerService],
  exports: [IssuerService],
})
export class IssuerModule {}
