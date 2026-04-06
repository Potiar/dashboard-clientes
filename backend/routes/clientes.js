const express = require('express')
const router = express.Router()
const clientesController = require('../controllers/clientesController')

router.get('/', clientesController.obtenerClientes)
router.post('/', clientesController.crearCliente)
router.patch('/:id', clientesController.actualizarEstado)

module.exports = router