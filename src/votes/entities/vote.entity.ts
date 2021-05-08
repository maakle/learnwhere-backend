import { Entity as TOEntity, Column, ManyToOne, JoinColumn } from 'typeorm';
import Entity from '../../database/baseEntity.entity';
import Post from '../../posts/entities/post.entity';
import User from '../../users/entities/user.entity';
import Comment from '../../comments/entities/comment.entity';

@TOEntity('votes')
export default class Vote extends Entity {
  constructor(vote: Partial<Vote>) {
    super();
    Object.assign(this, vote);
  }

  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Column()
  username: string;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Comment)
  comment: Comment;
}
