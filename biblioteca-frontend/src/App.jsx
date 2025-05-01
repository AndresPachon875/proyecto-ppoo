import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/libros'

function App() {
  const [libros, setLibros] = useState([])
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', autor: '', anio: '' })

  const cargarLibros = async () => {
    const res = await axios.get(API_URL)
    setLibros(res.data)
  }

  const agregarLibro = async () => {
    await axios.post(API_URL, nuevoLibro)
    setNuevoLibro({ titulo: '', autor: '', anio: '' })
    cargarLibros()
  }

  useEffect(() => {
    cargarLibros()
  }, [])

  return (
    <div>
      <h1>Biblioteca</h1>
      <input placeholder="Título" value={nuevoLibro.titulo} onChange={e => setNuevoLibro({...nuevoLibro, titulo: e.target.value})} />
      <input placeholder="Autor" value={nuevoLibro.autor} onChange={e => setNuevoLibro({...nuevoLibro, autor: e.target.value})} />
      <input placeholder="Año" value={nuevoLibro.anio} onChange={e => setNuevoLibro({...nuevoLibro, anio: e.target.value})} />
      <button onClick={agregarLibro}>Agregar</button>

      <ul>
        {libros.map(libro => (
          <li key={libro.id}>{libro.titulo} - {libro.autor} ({libro.anio})</li>
        ))}
      </ul>
    </div>
  )
}

export default App
