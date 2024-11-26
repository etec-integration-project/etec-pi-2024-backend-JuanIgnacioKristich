import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    firstname: string;

    @Column()
    Email: string;

    @Column()
    Password:string;

    @Column({
        default: true
    })
    active: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}