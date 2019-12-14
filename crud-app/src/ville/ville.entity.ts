import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ville {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    departement: number;

    @Column()
    nomVille: string;
}