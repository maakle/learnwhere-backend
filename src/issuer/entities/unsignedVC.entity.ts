import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UnsignedVc {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public type: string;

  @Column({
    type: 'jsonb',
  })
  public data: Record<string, unknown>;

  @Column()
  public holderDid: string;

  @Column({ nullable: true })
  public expiresAt?: string;
}

export default UnsignedVc;
