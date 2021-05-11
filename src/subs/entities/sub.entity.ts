// eslint-disable-next-line prettier/prettier
import { Column, Entity as TOEntity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import Entity from '../../database/baseEntity.entity';
import PublicFile from '../../database/entities/publicFile.entity';
import Post from '../../posts/entities/post.entity';
import User from '../../users/entities/user.entity';

// eslint-disable-next-line prettier/prettier
@TOEntity('subs')
export default class Sub extends Entity {
  constructor(sub: Partial<Sub>) {
    super();
    Object.assign(this, sub);
  }

  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  public imageUrn?: PublicFile;

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  public bannerUrn?: PublicFile;
}
