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
    idVille: number;

    @Column()
    anneeDebut: number;

    @Column()
    anneeFin: number;

    @Column()
    montantPrestation: number;

    @Column()
    detailPrestation: string;

    @Column({ nullable: true })
    img: string;

    @Column()
    domaine: string;
}