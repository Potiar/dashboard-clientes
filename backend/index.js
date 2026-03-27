const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
const PORT = 3001
const DB_PATH = path.join(__dirname, 'clientes.json')

// Middleware: permite que el servidor entienda JSON en los pedidos
app.use(express.json())

// ─── Funciones helper ────────────────────────────────────────────

// Leer clientes del archivo JSON
function leerClientes() {
  const data = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

// Guardar clientes en el archivo JSON
function guardarClientes(clientes) {
  fs.writeFileSync(DB_PATH, JSON.stringify(clientes, null, 2))
}

// ─── Rutas (Endpoints) ───────────────────────────────────────────

// GET /clientes → devuelve todos los clientes
app.get('/clientes', (req, res) => {
  const clientes = leerClientes()
  res.json(clientes)
})

// POST /clientes → agrega un nuevo cliente
app.post('/clientes', (req, res) => {
  const { nombre, email, estado } = req.body

  // Validaciones
  if (!nombre || !email || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValido) {
    return res.status(400).json({ error: 'El email no tiene un formato válido' })
  }

  const clientes = leerClientes()

  const nuevoCliente = {
    id: Date.now(), // usamos timestamp como ID único
    nombre,
    email,
    estado
  }

  clientes.push(nuevoCliente)
  guardarClientes(clientes)

  res.status(201).json(nuevoCliente)
})

// PATCH /clientes/:id → cambia el estado de un cliente
app.patch('/clientes/:id', (req, res) => {
  const id = Number(req.params.id)
  const { estado } = req.body

  if (!estado) {
    return res.status(400).json({ error: 'El estado es obligatorio' })
  }

  const clientes = leerClientes()
  const index = clientes.findIndex(c => c.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'Cliente no encontrado' })
  }

  clientes[index].estado = estado
  guardarClientes(clientes)

  res.json(clientes[index])
})

// ─── Iniciar servidor ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})