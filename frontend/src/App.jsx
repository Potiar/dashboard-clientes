import { useState, useEffect } from 'react'
import ClientesList from './components/ClientesList'
import ClienteForm from './components/ClienteForm'

function App() {
  const [clientes, setClientes] = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [busqueda, setBusqueda] = useState('')    // ← nuevo estado para la búsqueda

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

  // Primero filtra por estado, luego por búsqueda
  const clientesFiltrados = clientes
    .filter(c => filtro === 'todos' || c.estado === filtro)
    .filter(c => {
      const texto = busqueda.toLowerCase()
      return (
        c.nombre.toLowerCase().includes(texto) ||
        c.email.toLowerCase().includes(texto)
      )
    })

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard de Clientes</h1>
      <ClienteForm onAgregarCliente={agregarCliente} />
      <hr />

      {/* Buscador */}
      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: '6px', width: '300px' }}
        />
      </div>

      {/* Botones de filtro */}
      <div style={{ marginBottom: '12px' }}>
        <span>Filtrar por estado: </span>
        {['todos', 'lead', 'activo', 'inactivo'].map(opcion => (
          <button
            key={opcion}
            onClick={() => setFiltro(opcion)}
            style={{
              marginLeft: '8px',
              fontWeight: filtro === opcion ? 'bold' : 'normal',
              textDecoration: filtro === opcion ? 'underline' : 'none'
            }}
          >
            {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
          </button>
        ))}
      </div>

      {/* Mensaje si no hay resultados */}
      {clientesFiltrados.length === 0 && (
        <p style={{ color: 'gray' }}>No se encontraron clientes.</p>
      )}

      <ClientesList clientes={clientesFiltrados} onCambiarEstado={cambiarEstado} />
    </div>
  )
}


export default App