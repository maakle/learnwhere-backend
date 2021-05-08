import { Module } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, UsersModule],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
