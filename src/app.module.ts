import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

import jwtConfig from '../config/jwtConfig';
import { AppController } from './app.controller';
import { AuthenticationModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { SubsModule } from './subs/subs.module';
import { UsersModule } from './users/users.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({
      load: [jwtConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    SubsModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
