import { Request, Response } from 'express';

import Comment from '../comments/entities/comment.entity';
import { CommentOnPostDto } from './dto/comment-on-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import Post from './entities/post.entity';
import Sub from '../subs/entities/sub.entity';

@Injectable()
export class PostsService {
  async create(bodyData: CreatePostDto, res: Response) {
    const { title, body, sub } = bodyData;

    const user = res.locals.user;

    if (title.trim() === '') {
      return res.status(400).json({ title: 'Title must not be empty' });
    }

    try {
      // find sub
      const subRecord = await Sub.findOneOrFail({ name: sub });

      const post = new Post({ title, body, user, sub: subRecord });
      await post.save();

      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  async getPosts(req: Request, res: Response) {
    const currentPage: number = (req.query.page || 0) as number;
    const postsPerPage: number = (req.query.count || 8) as number;

    try {
      const posts = await Post.find({
        order: { createdAt: 'DESC' },
        relations: ['comments', 'votes', 'sub'],
        skip: currentPage * postsPerPage,
        take: postsPerPage,
      });

      if (res.locals.user) {
        posts.forEach((p) => p.setUserVote(res.locals.user));
      }

      return res.json(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  async getPost(identifier: string, slug: string, res: Response) {
    try {
      const post = await Post.findOneOrFail(
        { identifier, slug },
        { relations: ['sub', 'votes', 'comments'] },
      );

      if (res.locals.user) {
        post.setUserVote(res.locals.user);
      }

      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: 'Post not found' });
    }
  }

  async commentOnPost(
    identifier: string,
    slug: string,
    bodyData: CommentOnPostDto,
    res: Response,
  ) {
    const { body } = bodyData;

    try {
      const post = await Post.findOneOrFail({ identifier, slug });

      const comment = new Comment({
        body,
        user: res.locals.user,
        post,
      });

      await comment.save();

      return res.json(comment);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: 'Post not found' });
    }
  }

  async getPostComments(identifier: string, slug: string, res: Response) {
    try {
      const post = await Post.findOneOrFail({ identifier, slug });

      const comments = await Comment.find({
        where: { post },
        order: { createdAt: 'DESC' },
        relations: ['votes'],
      });

      if (res.locals.user) {
        comments.forEach((c) => c.setUserVote(res.locals.user));
      }

      return res.json(comments);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
