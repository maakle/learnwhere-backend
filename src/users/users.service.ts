import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';

import RegisterDto from '../auth/dto/register.dto';
import RequestWithUser from '../auth/requestWithUser.interface';
import Comment from '../comments/entities/comment.entity';
import Post from '../posts/entities/post.entity';
import Vote from '../votes/entities/vote.entity';
import { VoteDto } from './dto/vote.dto';
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
        where: { username },
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
        posts.forEach((p) => p.setUserVote(user));
        comments.forEach((c) => c.setUserVote(user));
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

  public async vote(voteDto: VoteDto, req: RequestWithUser, res: Response) {
    const { identifier, slug, commentIdentifier, value } = voteDto;
    const { user } = req;

    // Validate vote value
    if (![-1, 0, 1].includes(value)) {
      throw new HttpException(
        'Value must be -1, 0 or 1',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      let post = await Post.findOneOrFail({ identifier, slug });
      let vote: Vote | undefined;
      let comment: Comment | undefined;

      if (commentIdentifier) {
        // IF there is a comment identifier find vote by comment
        comment = await Comment.findOneOrFail({
          identifier: commentIdentifier,
        });
        vote = await Vote.findOne({ user, comment });
      } else {
        // Else find vote by post
        vote = await Vote.findOne({ user, post });
      }

      if (!vote && value === 0) {
        // if no vote and value = 0 return error
        throw new HttpException('Vote not found', HttpStatus.NOT_FOUND);
      } else if (!vote) {
        // If no vote create it
        vote = new Vote({ user, value });
        if (comment) vote.comment = comment;
        else vote.post = post;
        await vote.save();
      } else if (value === 0) {
        // If vote exists and value = 0 remove vote from DB
        await vote.remove();
      } else if (vote.value !== value) {
        // If vote and value has changed, update vote
        vote.value = value;
        await vote.save();
      }

      post = await Post.findOneOrFail(
        { identifier, slug },
        { relations: ['comments', 'comments.votes', 'sub', 'votes'] },
      );
      post.setUserVote(user);
      post.comments.forEach((c) => c.setUserVote(user));

      return res.json(post);
    } catch (err) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
