import { useState } from 'react'

function ClienteForm({ onAgregarCliente }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState('lead')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Validaciones en el frontend
    if (!nombre || !email) {
      setError('Todos los campos son obligatorios')
      return
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailValido) {
      setError('El email no tiene un formato válido')
      return
    }

    onAgregarCliente({ nombre, email, estado })

    // Limpiar el formulario
    setNombre('')
    setEmail('')
    setEstado('lead')
  }

  return (
    <div>
      <h2>Agregar Cliente</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Juan Pérez"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="juan@mail.com"
          />
        </div>
        <div>
          <label>Estado:</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="lead">Lead</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit">Agregar Cliente</button>
      </form>
    </div>
  )
}

export default ClienteForm