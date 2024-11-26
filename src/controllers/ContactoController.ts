// Importamos las dependencias necesarias
import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Contacto } from '../entities/Contacto';

// Controlador para crear un contacto
export const createContacto = async (req: Request, res: Response) => {
  const { nombre, email, telefono, mensaje, carrito } = req.body;
  
  try {
    // Creamos una nueva instancia de la entidad Contacto
    const nuevoContacto = new Contacto();
    nuevoContacto.nombre = nombre;
    nuevoContacto.email = email;
    nuevoContacto.telefono = telefono;
    nuevoContacto.mensaje = mensaje;
    nuevoContacto.carrito = carrito;

    // Guardamos el contacto en la base de datos
    await AppDataSource.manager.save(nuevoContacto);
    
    return res.status(201).json({ mensaje: 'Contacto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el contacto:', error);
    return res.status(500).json({ mensaje: 'Error al crear el contacto' });
  }
};

// Controlador para obtener todos los contactos
export const getContactos = async (_req: Request, res: Response) => {
  try {
    const contactos = await AppDataSource.manager.find(Contacto);
    return res.status(200).json(contactos);
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    return res.status(500).json({ mensaje: 'Error al obtener los contactos' });
  }
};

// Controlador para obtener un contacto por ID
export const getContactoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const contacto = await AppDataSource.manager.findOne(Contacto, { where: { id: parseInt(id, 10) } });

    if (!contacto) {
      return res.status(404).json({ mensaje: 'Contacto no encontrado' });
    }

    return res.status(200).json(contacto);
  } catch (error) {
    console.error('Error al obtener el contacto:', error);
    return res.status(500).json({ mensaje: 'Error al obtener el contacto' });
  }
};

// Controlador para eliminar un contacto por ID
export const deleteContactoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AppDataSource.manager.delete(Contacto, { id: parseInt(id, 10) });

    if (result.affected === 0) {
      return res.status(404).json({ mensaje: 'Contacto no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Contacto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el contacto:', error);
    return res.status(500).json({ mensaje: 'Error al eliminar el contacto' });
  }
};
