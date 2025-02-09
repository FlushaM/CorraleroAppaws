// routes/marcajes.js
const express = require('express');
const router = express.Router();
const marcajesController = require('../controllers/marcajesController');

// POST /api/marcajes → Registrar un marcaje
router.post('/', marcajesController.registrarMarcaje);

// GET /api/marcajes → Listar marcajes
router.get('/', marcajesController.obtenerMarcajes);

// GET /api/marcajes/:id → Obtener un marcaje específico
router.get('/:id', marcajesController.obtenerMarcaje);

// DELETE /api/marcajes/:id → Eliminar un marcaje
router.delete('/:id', marcajesController.eliminarMarcaje);

module.exports = router;
