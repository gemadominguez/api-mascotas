const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotas.controller');
const validarMascota = require('../middlewares/mascota.validator');
const verificarToken = require('../middlewares/authMiddleware');


// Rutas CRUD
router.get('/', mascotasController.obtenerMascotas);
router.get('/:id', mascotasController.obtenerMascotaPorId);
router.post('/', verificarToken, validarMascota, mascotasController.crearMascota);
router.put('/:id', verificarToken, validarMascota, mascotasController.actualizarMascota);
router.delete('/:id', verificarToken, validarMascota, mascotasController.eliminarMascota);

module.exports = router;

