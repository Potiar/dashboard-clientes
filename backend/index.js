const express = require('express')
const cors = require('cors')
const clientesRoutes = require('./routes/clientes')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Conecta todas las rutas de clientes bajo /clientes
app.use('/clientes', clientesRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})