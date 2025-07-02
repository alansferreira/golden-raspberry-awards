import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Studios {
  @PrimaryGeneratedColumn()
  @Generated()
  id?: number;

  @Column()
  year: number;
  @Column()
  title: string;
  @Column()
  studio: string;
  @Column()
  producers: string;
  @Column()
  winner: boolean;
}
