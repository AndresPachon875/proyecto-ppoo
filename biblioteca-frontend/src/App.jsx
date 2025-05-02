import { useEffect, useState } from 'react'
import { getLibros, createLibro } from './api/libros'
import LibroForm from './components/LibroForm'
import LibroList from './components/LibroList'

function App() {
  const [libros, setLibros] = useState([])

  const cargarLibros = async () => {
    const res = await getLibros()
    setLibros(res.data)
  }

  const agregarLibro = async (libro) => {
    await createLibro(libro)
    cargarLibros()
  }

  useEffect(() => {
    cargarLibros()
  }, [])

  return (
    <div className='w-full h-full grid grid-cols-1 gap-4 p-4 place-items-center'>  
      <h1 className='text-5xl'>Biblioteca</h1>
      <LibroForm onAdd={agregarLibro} />
      <LibroList libros={libros} />
    </div>
  )
}

export default App