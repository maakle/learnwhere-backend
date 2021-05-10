import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Comment from '../comments/entities/comment.entity';
import Post from '../posts/entities/post.entity';
import Sub from '../subs/entities/sub.entity';
import User from '../users/entities/user.entity';
import Vote from '../votes/entities/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Comment, Post, Sub, Vote],
      synchronize: process.env.NODE_ENV === 'development',
    }),
  ],
})
export class DatabaseModule {}
