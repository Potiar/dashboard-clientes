import { useState, useEffect } from 'react'
import ClientesList from './components/ClientesList'
import ClienteForm from './components/ClienteForm'

function App() {
  const [clientes, setClientes] = useState([])

  // Cargar clientes al iniciar la app
  useEffect(() => {
    fetch('http://localhost:3001/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
  }, [])

  // Agregar un nuevo cliente
  function agregarCliente(nuevoCliente) {
    fetch('http://localhost:3001/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente)
    })
      .then(res => res.json())
      .then(clienteCreado => setClientes([...clientes, clienteCreado]))
  }

  // Cambiar estado de un cliente
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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard de Clientes</h1>
      <ClienteForm onAgregarCliente={agregarCliente} />
      <hr />
      <ClientesList clientes={clientes} onCambiarEstado={cambiarEstado} />
    </div>
  )
}

export default App