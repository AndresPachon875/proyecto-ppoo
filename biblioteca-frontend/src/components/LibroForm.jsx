import { useState } from 'react'

function LibroForm({ onAdd }) {
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', autor: '', anio: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(nuevoLibro)
    setNuevoLibro({ titulo: '', autor: '', anio: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Título" value={nuevoLibro.titulo} onChange={e => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })} />
      <input placeholder="Autor" value={nuevoLibro.autor} onChange={e => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })} />
      <input placeholder="Año" value={nuevoLibro.anio} onChange={e => setNuevoLibro({ ...nuevoLibro, anio: e.target.value })} />
      <button type="submit">Agregar</button>
    </form>
  )
}

export default LibroForm