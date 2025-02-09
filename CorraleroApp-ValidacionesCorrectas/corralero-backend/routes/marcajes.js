const express = require('express');
const router = express.Router();
const marcajesController = require('../controllers/marcajesController');
const verifyToken = require('../middlewares/authMiddleware');
const verifyRole = require('../middlewares/verifyRole');

//Solo usuarios con rol 'reloj' pueden registrar marcajes
router.post('/', verifyToken, verifyRole(['reloj']), marcajesController.registrarMarcaje);

//  Solo 'admin' y 'reloj' pueden ver marcajes
router.get('/', verifyToken, verifyRole(['admin', 'reloj']), marcajesController.obtenerMarcajes);

//  Solo 'admin' y 'reloj' pueden obtener un marcaje específico
router.get('/:id', verifyToken, verifyRole(['admin', 'reloj']), marcajesController.obtenerMarcaje);

//  Solo 'admin' puede eliminar un marcaje
router.delete('/:id', verifyToken, verifyRole(['admin']), marcajesController.eliminarMarcaje);

module.exports = router;
