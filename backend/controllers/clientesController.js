const clientesModel = require('../models/clientesModel')

// GET /clientes
function obtenerClientes(req, res) {
  const clientes = clientesModel.obtenerTodos()
  res.json(clientes)
}

// POST /clientes
function crearCliente(req, res) {
  const { nombre, email, estado } = req.body

  // Validaciones
  if (!nombre || !email || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValido) {
    return res.status(400).json({ error: 'El email no tiene un formato válido' })
  }

  const nuevoCliente = {
    id: Date.now(),
    nombre,
    email,
    estado
  }

  const clienteCreado = clientesModel.crear(nuevoCliente)
  res.status(201).json(clienteCreado)
}

// PATCH /clientes/:id
function actualizarEstado(req, res) {
  const id = Number(req.params.id)
  const { estado } = req.body

  if (!estado) {
    return res.status(400).json({ error: 'El estado es obligatorio' })
  }

  const clienteActualizado = clientesModel.actualizarEstado(id, estado)

  if (!clienteActualizado) {
    return res.status(404).json({ error: 'Cliente no encontrado' })
  }

  res.json(clienteActualizado)
}

module.exports = { obtenerClientes, crearCliente, actualizarEstado }