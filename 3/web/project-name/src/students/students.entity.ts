import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullname: string;

  @Column({ length: 100 })
  groups: string;

  @Column({ length: 100 })
  universityId: string;
}