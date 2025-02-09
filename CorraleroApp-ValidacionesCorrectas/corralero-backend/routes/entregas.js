const express = require('express');
const {
  registrarMarcaje,
  obtenerMarcajes,
  obtenerMarcaje,
  eliminarMarcaje,
  // si necesitas un método adicional, por ejemplo para "marcarRevisado" o "actualizarMarcaje",
  // lo agregas aquí
} = require('../controllers/marcajesController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas protegidas para los marcajes
router.post('/', verifyToken, registrarMarcaje);        // Crear/actualizar el marcaje de hoy
router.get('/', verifyToken, obtenerMarcajes);          // Listar todos los marcajes (o según rol)
router.get('/:id', verifyToken, obtenerMarcaje);        // Obtener un marcaje específico
// Si necesitas un PATCH para actualizar un campo (similar a "marcarRevisado"):
// router.patch('/:id', verifyToken, marcarAlgoEnMarcaje);
router.delete('/:id', verifyToken, eliminarMarcaje);    // Eliminar un marcaje

module.exports = router;
