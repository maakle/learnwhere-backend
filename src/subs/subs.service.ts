import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { Response } from 'express';
import { getRepository } from 'typeorm';

import RequestWithUser from '../auth/requestWithUser.interface';
import Post from '../posts/entities/post.entity';
import NewSubDto from './dto/new-sub.dto';
import Sub from './entities/sub.entity';

@Injectable()
export class SubsService {
  public async createSub(
    req: RequestWithUser,
    res: Response,
    newSubData: NewSubDto,
  ) {
    const { user } = req;
    const { name, title, description } = newSubData;

    try {
      const errors: any = {};
      if (isEmpty(name)) errors.name = 'Name must not be empty';
      if (isEmpty(title)) errors.title = 'Title must not be empty';

      const sub = await getRepository(Sub)
        .createQueryBuilder('sub')
        .where('lower(sub.name) = :name', { name: name.toLowerCase() })
        .getOne();

      if (sub) errors.name = 'Sub exists already';

      if (Object.keys(errors).length > 0) {
        throw errors;
      }
    } catch (err) {
      return res.status(400).json(err);
    }

    try {
      const sub = new Sub({ name, description, title, user });
      await sub.save();

      return res.json(sub);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public async getSub(name: string, req: RequestWithUser, res: Response) {
    const { user } = req;

    try {
      const sub = await Sub.findOneOrFail({ name });
      const posts = await Post.find({
        where: { sub },
        order: { createdAt: 'DESC' },
        relations: ['comments', 'votes'],
      });

      sub.posts = posts;

      if (user) {
        sub.posts.forEach((p) => p.setUserVote(res.locals.user));
      }

      return res.json(sub);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ sub: 'Sub not found' });
    }
  }

  public async searchSubs(name: string, res: Response) {
    try {
      if (isEmpty(name)) {
        return res.status(400).json({ error: 'Name must not be empty' });
      }

      const subs = await getRepository(Sub)
        .createQueryBuilder()
        .where('LOWER(name) LIKE :name', {
          name: `${name.toLowerCase().trim()}%`,
        })
        .getMany();

      return res.json(subs);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public async uploadSubImage(req: RequestWithUser, res: Response) {
    // TODO
    return res.send('Received');
  }
}