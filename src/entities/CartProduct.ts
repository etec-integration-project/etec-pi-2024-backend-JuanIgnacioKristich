import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Cart } from './Cart';
import { Products } from './Products';

@Entity()
export class CartProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cart, cart => cart.cartProducts)
    cart: Cart;

    @ManyToOne(() => Products)
    product: Products;

    @Column()
    quantity: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}