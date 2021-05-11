import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import Comment from '../comments/entities/comment.entity';
import PublicFile from '../database/entities/publicFile.entity';
import Post from '../posts/entities/post.entity';
import Sub from '../subs/entities/sub.entity';
import User from '../users/entities/user.entity';
import Vote from '../votes/entities/vote.entity';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigService,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Comment, Post, Sub, Vote, PublicFile],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forFeature([PublicFile]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
