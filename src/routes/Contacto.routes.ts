// Importamos el controlador de contacto
import express from 'express';
import {
  createContacto,
} from '../controllers/ContactoController';

// Creamos un enrutador de Express
const router = express.Router();

// Ruta para crear un nuevo contacto
router.post('/contact', createContacto);

export default router;