const fs = require('fs')
const path = require('path')

const DB_PATH = path.join(__dirname, '..', 'clientes.json')

// Leer todos los clientes
function obtenerTodos() {
  const data = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

// Guardar la lista completa
function guardarTodos(clientes) {
  fs.writeFileSync(DB_PATH, JSON.stringify(clientes, null, 2))
}

// Crear un cliente nuevo
function crear(nuevoCliente) {
  const clientes = obtenerTodos()
  clientes.push(nuevoCliente)
  guardarTodos(clientes)
  return nuevoCliente
}

// Actualizar el estado de un cliente
function actualizarEstado(id, nuevoEstado) {
  const clientes = obtenerTodos()
  const index = clientes.findIndex(c => c.id === id)

  if (index === -1) return null

  clientes[index].estado = nuevoEstado
  guardarTodos(clientes)
  return clientes[index]
}

module.exports = { obtenerTodos, crear, actualizarEstado }