import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import Credential from '../credentials/entities/credential.entity';
import UnsignedVc from '../issuer/entities/unsignedVc.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      database: process.env.DATABASE_NAME,
      entities: [Credential, User, UnsignedVc],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
