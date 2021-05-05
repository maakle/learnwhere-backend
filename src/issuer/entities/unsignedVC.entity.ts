import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VCV1Unsigned, VCV1Skeleton } from '@affinidi/vc-common';

@Entity()
class UnsignedVC {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public type: string;

  @Column({
    type: 'jsonb',
  })
  @Column()
  public data: Record<string, unknown>;

  @Column()
  public holderDid: string;

  @Column({ nullable: true })
  public expiresAt?: string;
}

export default UnsignedVC;
