import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Departement {
    @PrimaryColumn()
    id: string;

    @Column()
    nomDep: string;

}