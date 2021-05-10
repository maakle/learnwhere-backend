import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

import RequestWithUser from '../auth/requestWithUser.interface';
import Comment from '../comments/entities/comment.entity';
import Sub from '../subs/entities/sub.entity';
import { CommentOnPostDto } from './dto/comment-on-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import Post from './entities/post.entity';

@Injectable()
export class PostsService {
  async create(bodyData: CreatePostDto, req: RequestWithUser, res: Response) {
    const { title, body, sub } = bodyData;
    const { user } = req;

    if (title.trim() === '') {
      return res.status(400).json({ title: 'Title must not be empty' });
    }

    try {
      const subRecord = await Sub.findOneOrFail({ name: sub });
      const post = new Post({ title, body, user, sub: subRecord });
      await post.save();
      return post;
    } catch (err) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPosts(req: RequestWithUser, res: Response) {
    const currentPage: number = (req.query.page || 0) as number;
    const postsPerPage: number = (req.query.count || 8) as number;
    const { user } = req;

    try {
      const posts = await Post.find({
        order: { createdAt: 'DESC' },
        relations: ['comments', 'votes', 'sub'],
        skip: currentPage * postsPerPage,
        take: postsPerPage,
      });

      if (user) {
        posts.forEach((p) => p.setUserVote(user));
      }

      return res.send(posts);
    } catch (err) {
      throw new HttpException('Posts not found', HttpStatus.NOT_FOUND);
    }
  }

  async getPost(
    identifier: string,
    slug: string,
    req: RequestWithUser,
    res: Response,
  ) {
    const { user } = req;
    try {
      const post = await Post.findOneOrFail(
        { identifier, slug },
        { relations: ['sub', 'votes', 'comments'] },
      );

      if (user) {
        post.setUserVote(user);
      }
      return res.send(post);
    } catch (err) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  async commentOnPost(
    identifier: string,
    slug: string,
    bodyData: CommentOnPostDto,
    req: RequestWithUser,
    res: Response,
  ) {
    const { body } = bodyData;
    const { user } = req;

    try {
      const post = await Post.findOneOrFail({ identifier, slug });
      const comment = new Comment({
        body,
        user: user,
        post,
      });
      await comment.save();
      return res.send(comment);
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getPostComments(
    identifier: string,
    slug: string,
    req: RequestWithUser,
    res: Response,
  ) {
    const { user } = req;

    try {
      const post = await Post.findOneOrFail({ identifier, slug });
      const comments = await Comment.find({
        where: { post },
        order: { createdAt: 'DESC' },
        relations: ['votes'],
      });

      if (user) {
        comments.forEach((c) => c.setUserVote(user));
      }

      return res.send(comments);
    } catch (err) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
