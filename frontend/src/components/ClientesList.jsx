const estilosEstado = {
  lead: { backgroundColor: '#EFF3F6', color: '#39586D' },
  activo: { backgroundColor: '#e6f4ea', color: '#2d6a4f' },
  inactivo: { backgroundColor: '#fce8e8', color: '#9b2c2c' },
}

function ClientesList({ clientes, onCambiarEstado, colores }) {
  return (
    <div
      className="rounded-xl shadow-sm overflow-hidden transition-colors duration-300"
      style={{ border: `1px solid ${colores.borde}` }}
    >
      <table className="w-full text-sm text-left">
        <thead>
          <tr style={{ backgroundColor: colores.tableHeader }}>
            {['Nombre', 'Email', 'Estado', 'Cambiar Estado'].map(col => (
              <th
                key={col}
                className="px-6 py-4 font-medium text-xs uppercase tracking-wider"
                style={{ color: '#D2D7DB' }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr
              key={cliente.id}
              className="transition-colors duration-300"
              style={{
                borderBottom: `1px solid ${colores.borde}`,
                backgroundColor: index % 2 === 0 ? colores.filaImpar : colores.filaPar
              }}
            >
              <td className="px-6 py-4 font-medium" style={{ color: colores.texto }}>
                {cliente.nombre}
              </td>
              <td className="px-6 py-4" style={{ color: colores.textoSecundario }}>
                {cliente.email}
              </td>
              <td className="px-6 py-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={estilosEstado[cliente.estado]}
                >
                  {cliente.estado.charAt(0).toUpperCase() + cliente.estado.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4">
                <select
                  value={cliente.estado}
                  onChange={(e) => onCambiarEstado(cliente.id, e.target.value)}
                  className="rounded-lg px-3 py-1 text-sm focus:outline-none transition-colors duration-300"
                  style={{ border: `1px solid ${colores.borde}`, color: colores.inputTexto, backgroundColor: colores.inputFondo }}
                >
                  <option value="lead">Lead</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClientesList