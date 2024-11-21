import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Products } from './Products'; // Asegúrate de que la ruta es correcta

@Entity()
export class Cart extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToMany(() => Products)
    // @JoinTable()
    // products: Products[];

    @Column({
        length: 512
    })
    information: string;

    @Column()
    userId: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}

