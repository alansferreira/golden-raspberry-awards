import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  @Generated()
  id?: number;

  @Column()
  year: number;
  @Column()
  title: string;
  @Column()
  studios: string;
  @Column()
  producer: string;
  @Column()
  winner: boolean;
}
