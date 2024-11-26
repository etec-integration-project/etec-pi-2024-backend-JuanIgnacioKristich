import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class Contacto extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    telefono: string;

    @Column()
    mensaje: string;

    @Column("simple-json")
    carrito: { nombreProducto: string; cantidad: number; precioTotal: number }[];

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;
}

export default Contacto;
