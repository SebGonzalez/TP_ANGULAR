import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reference {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mission: string;

    @Column()
    client: string;

    @Column()
    idville: number;

    @Column()
    anneeDebut: number;

    @Column()
    anneeFin: number;

    @Column()
    montantPrestation: number;

    @Column()
    detailPrestation: string;

    @Column()
    domaine: string;
}