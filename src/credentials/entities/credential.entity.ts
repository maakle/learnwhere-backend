import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Credential {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    type: 'jsonb',
  })
  public credential: Record<string, unknown>;
}

export default Credential;
