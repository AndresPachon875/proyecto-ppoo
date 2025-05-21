import { useEffect, useState } from 'react'
import { getLibros, createLibro, updateLibro, deleteLibro, buscarLibros } from './api/libros'
import LibroForm from './components/LibroForm'
import LibroList from './components/LibroList'
import Navbar from './components/Navbar'

function App() {
  const [libros, setLibros] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const cargarLibros = async () => {
    const res = await getLibros()
    setLibros(res.data)
  }

  const buscar = async (e) => {
    const valor = e.target.value
    setBusqueda(valor)
    if (valor.trim() === "") {
      cargarLibros()
    } else {
      const res = await buscarLibros(valor)
      setLibros(res.data)
    }
  }

  const agregarLibro = async (libro) => {
    await createLibro(libro)
    cargarLibros()
  }

  const editarLibro = async (id, datosActualizados) => {
    await updateLibro(id, datosActualizados)
    cargarLibros()
  }

  const eliminarLibro = async (id) => {
    await deleteLibro(id)
    cargarLibros()
  }

  useEffect(() => {
    cargarLibros()
  }, [])

  return (
    <main className='container font-serif mx-auto'>
      <Navbar />
      <div className='w-full h-full grid grid-cols-1 gap-4 p-4 place-items-center'>  
        <h1 className='text-5xl'>Biblioteca</h1>
        {/* 🔍 Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por título o autor"
          value={busqueda}
          onChange={buscar}
          className="border border-gray-300 px-4 py-2 w-full max-w-md rounded"
        />
        <LibroForm onAdd={agregarLibro} />
        <LibroList
          libros={libros}
          onEdit={editarLibro}
          onDelete={eliminarLibro}
        />
      </div>
    </main>
  )
}

export default App
