import { useState, useEffect } from 'react'
import ClientesList from './components/ClientesList'
import ClienteForm from './components/ClienteForm'

function App() {
  const [clientes, setClientes] = useState([])
  const [filtro, setFiltro] = useState('todos')   

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

  // Filtra la lista según el estado seleccionado
  const clientesFiltrados = filtro === 'todos'
    ? clientes
    : clientes.filter(c => c.estado === filtro)

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard de Clientes</h1>
      <ClienteForm onAgregarCliente={agregarCliente} />
      <hr />

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

      <ClientesList clientes={clientesFiltrados} onCambiarEstado={cambiarEstado} />
    </div>
  )
}

export default App