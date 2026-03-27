function ClientesList({ clientes, onCambiarEstado }) {
  return (
    <div>
      <h2>Clientes</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>{cliente.estado}</td>
              <td>
                <select
                  value={cliente.estado}
                  onChange={(e) => onCambiarEstado(cliente.id, e.target.value)}
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