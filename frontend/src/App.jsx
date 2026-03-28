import { useState, useEffect } from 'react'
import ClientesList from './components/ClientesList'
import ClienteForm from './components/ClienteForm'

function App() {
  const [clientes, setClientes] = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [darkMode, setDarkMode] = useState(false)  // ← nuevo

  // Paleta de colores según el modo
  const colores = darkMode ? {
    fondo: '#1a2a38',
    header: '#0f1c26',
    tarjeta: '#2C4156',
    borde: '#39586D',
    texto: '#D2D7DB',
    textoSecundario: '#7F99B2',
    botonActivo: '#7F99B2',
    botonActivoTexto: '#0f1c26',
    botonInactivo: '#39586D',
    botonInactivoTexto: '#D2D7DB',
    inputFondo: '#1a2a38',
    inputTexto: '#D2D7DB',
    tableHeader: '#0f1c26',
    filaImpar: '#2C4156',
    filaPar: '#263d52',
  } : {
    fondo: '#F7F7F7',
    header: '#2C4156',
    tarjeta: '#ffffff',
    borde: '#D2D7DB',
    texto: '#2C4156',
    textoSecundario: '#98A1AA',
    botonActivo: '#39586D',
    botonActivoTexto: '#F7F7F7',
    botonInactivo: '#D2D7DB',
    botonInactivoTexto: '#2C4156',
    inputFondo: '#F7F7F7',
    inputTexto: '#2C4156',
    tableHeader: '#2C4156',
    filaImpar: '#ffffff',
    filaPar: '#F7F7F7',
  }

  useEffect(() => {
    fetch('http://localhost:3001/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
  }, [])

  function agregarCliente(nuevoCliente) {
    fetch('http://localhost:3001/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente)
    })
      .then(res => res.json())
      .then(clienteCreado => setClientes([...clientes, clienteCreado]))
  }

  function cambiarEstado(id, nuevoEstado) {
    fetch(`http://localhost:3001/clientes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    })
      .then(res => res.json())
      .then(clienteActualizado => {
        setClientes(clientes.map(c =>
          c.id === clienteActualizado.id ? clienteActualizado : c
        ))
      })
  }

  const clientesFiltrados = clientes
    .filter(c => filtro === 'todos' || c.estado === filtro)
    .filter(c => {
      const texto = busqueda.toLowerCase()
      return (
        c.nombre.toLowerCase().includes(texto) ||
        c.email.toLowerCase().includes(texto)
      )
    })

  const botones = ['todos', 'lead', 'activo', 'inactivo']

  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: colores.fondo }}>

      {/* Header */}
      <div className="px-8 py-5 shadow-md flex justify-between items-center transition-colors duration-300"
        style={{ backgroundColor: colores.header }}>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Dashboard de Clientes
          </h1>
          <p className="text-sm mt-1" style={{ color: '#98A1AA' }}>
            Gestioná tus clientes y leads
          </p>
        </div>

        {/* Botón modo nocturno */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
          style={{
            backgroundColor: darkMode ? '#7F99B2' : '#39586D',
            color: darkMode ? '#0f1c26' : '#F7F7F7'
          }}
        >
          {darkMode ? '☀️ Modo claro' : '🌙 Modo oscuro'}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">

        {/* Formulario */}
        <ClienteForm
          onAgregarCliente={agregarCliente}
          colores={colores}
        />

        {/* Búsqueda y filtros */}
        <div
          className="rounded-xl shadow-sm p-4 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-colors duration-300"
          style={{ backgroundColor: colores.tarjeta, border: `1px solid ${colores.borde}` }}
        >
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="rounded-lg px-4 py-2 w-full sm:w-72 text-sm focus:outline-none transition-colors duration-300"
            style={{
              border: `1px solid ${colores.borde}`,
              backgroundColor: colores.inputFondo,
              color: colores.inputTexto
            }}
          />
          <div className="flex gap-2 flex-wrap">
            {botones.map(opcion => (
              <button
                key={opcion}
                onClick={() => setFiltro(opcion)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                style={
                  filtro === opcion
                    ? { backgroundColor: colores.botonActivo, color: colores.botonActivoTexto }
                    : { backgroundColor: colores.botonInactivo, color: colores.botonInactivoTexto }
                }
              >
                {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Lista o mensaje vacío */}
        {clientesFiltrados.length === 0 ? (
          <div
            className="rounded-xl shadow-sm p-8 text-center transition-colors duration-300"
            style={{ backgroundColor: colores.tarjeta, color: colores.textoSecundario, border: `1px solid ${colores.borde}` }}
          >
            No se encontraron clientes.
          </div>
        ) : (
          <ClientesList
            clientes={clientesFiltrados}
            onCambiarEstado={cambiarEstado}
            colores={colores}
          />
        )}

      </div>
    </div>
  )
}

export default App