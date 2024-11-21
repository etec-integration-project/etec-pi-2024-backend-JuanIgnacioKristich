// Nueva Entidad: Cart
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { CartProduct } from './CartProduct';

@Entity()
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @OneToMany(() => CartProduct, cartProduct => cartProduct.cart, { cascade: true })
    cartProducts: CartProduct[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}

