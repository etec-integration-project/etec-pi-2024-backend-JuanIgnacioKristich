
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cart: string;

    @Column()
    firstname: string;

    @Column()
    Price: number;

    @Column()
    img: string;

    @Column()
    quantity: number;

    constructor(cart: string) {
        this.cart = cart;
    }
}
