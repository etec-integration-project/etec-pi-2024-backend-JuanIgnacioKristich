// src/entities/Cart.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cart: string;

    @Column()
    firstname: string;

    @Column('decimal')
    price: number;

    @Column()
    img: string;

    @Column()
    quantity: number;

    constructor(cart: string) {
        this.cart = cart;
    }
}
