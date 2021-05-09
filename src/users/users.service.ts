import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import RegisterDto from 'src/auth/dto/register.dto';
import { Repository } from 'typeorm';

import Comment from '../comments/entities/comment.entity';
import Post from '../posts/entities/post.entity';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async createUser(userData: RegisterDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  public async getUserSubmissions(username: string, res: Response) {
    try {
      const user = await User.findOneOrFail({
        where: { username: username },
        select: ['username', 'createdAt'],
      });

      const posts = await Post.find({
        where: { user },
        relations: ['comments', 'votes', 'sub'],
      });

      const comments = await Comment.find({
        where: { user },
        relations: ['post'],
      });

      if (user) {
        posts.forEach((p) => p.setUserVote(res.locals.user));
        comments.forEach((c) => c.setUserVote(res.locals.user));
      }

      const submissions: any[] = [];
      posts.forEach((p) => submissions.push({ type: 'Post', ...p.toJSON() }));
      comments.forEach((c) =>
        submissions.push({ type: 'Comment', ...c.toJSON() }),
      );

      submissions.sort((a, b) => {
        if (b.createdAt > a.createdAt) return 1;
        if (b.createdAt < a.createdAt) return -1;
        return 0;
      });

      return res.json({ user, submissions });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
