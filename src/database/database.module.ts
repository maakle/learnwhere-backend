import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import Comment from '../comments/entities/comment.entity';
import Vote from '../votes/entities/vote.entity';
import Sub from '../subs/entities/sub.entity';
import Post from '../posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Comment, Post, Sub, Vote],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
