import { Column, Index, OneToMany, Entity as TOEntity } from 'typeorm';
import { IsEmail, Length } from 'class-validator';

import Entity from '../../database/baseEntity.entity';
import { Exclude } from 'class-transformer';
import Post from '../../posts/entities/post.entity';
import Vote from '../../votes/entities/vote.entity';

@TOEntity('users')
class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @Length(1, 255, { message: 'Email is empty' })
  @Column({ unique: true })
  public email: string;

  @Index()
  @Length(3, 255, { message: 'Must be at least 3 characters long' })
  @Column({ unique: true })
  public username: string;

  @Exclude()
  @Column()
  @Length(6, 255, { message: 'Must be at least 6 characters long' })
  @Column()
  public password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  token: any;
}

export default User;
