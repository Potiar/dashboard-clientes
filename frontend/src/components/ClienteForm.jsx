import { useState } from 'react'

function ClienteForm({ onAgregarCliente, colores }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState('lead')
  const [error, setError] = useState('')
  const [abierto, setAbierto] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

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
    setNombre('')
    setEmail('')
    setEstado('lead')
    setAbierto(false)
  }

  return (
    <div
      className="rounded-xl shadow-sm p-6 mb-6 transition-colors duration-300"
      style={{ backgroundColor: colores.tarjeta, border: `1px solid ${colores.borde}` }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: colores.texto }}>
            Clientes
          </h2>
          <p className="text-xs mt-0.5" style={{ color: colores.textoSecundario }}>
            {abierto ? 'Completá los datos del nuevo cliente' : 'Agregá un nuevo cliente o lead'}
          </p>
        </div>
        <button
          onClick={() => setAbierto(!abierto)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
          style={
            abierto
              ? { backgroundColor: colores.botonInactivo, color: colores.botonInactivoTexto }
              : { backgroundColor: colores.botonActivo, color: colores.botonActivoTexto }
          }
        >
          {abierto ? 'Cancelar' : '+ Nuevo Cliente'}
        </button>
      </div>

      {abierto && (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          {error && (
            <p className="text-sm px-4 py-2 rounded-lg"
              style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
              {error}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="rounded-lg px-4 py-2 flex-1 text-sm focus:outline-none transition-colors duration-300"
              style={{ border: `1px solid ${colores.borde}`, color: colores.inputTexto, backgroundColor: colores.inputFondo }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg px-4 py-2 flex-1 text-sm focus:outline-none transition-colors duration-300"
              style={{ border: `1px solid ${colores.borde}`, color: colores.inputTexto, backgroundColor: colores.inputFondo }}
            />
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="rounded-lg px-4 py-2 text-sm focus:outline-none transition-colors duration-300"
              style={{ border: `1px solid ${colores.borde}`, color: colores.inputTexto, backgroundColor: colores.inputFondo }}
            >
              <option value="lead">Lead</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-sm font-medium self-end transition-colors duration-300"
            style={{ backgroundColor: colores.botonActivo, color: colores.botonActivoTexto }}
          >
            Guardar Cliente
          </button>
        </form>
      )}
    </div>
  )
}

export default ClienteForm