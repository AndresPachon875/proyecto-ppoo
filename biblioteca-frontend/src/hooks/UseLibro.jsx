import { useEffect, useState } from 'react'
import {
  getLibros,
  createLibro,
  updateLibro,
  deleteLibro,
  buscarLibros
} from '../api/libros.js'

export function useLibros() {
  const [libros, setLibros] = useState([])
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    cargarLibros()
  }, [])

  const cargarLibros = async () => {
    const res = await getLibros()
    setLibros(res.data)
  }

  const buscar = async (texto) => {
    setBusqueda(texto)
    if (texto === '') return cargarLibros()
    const res = await buscarLibros(texto)
    setLibros(res.data)
  }

  const agregarLibro = async (libro) => {
    await createLibro(libro)
    cargarLibros()
  }

  const editarLibro = async (libro) => {
    await updateLibro(libro.id, libro)
    cargarLibros()
  }

  const eliminarLibro = async (libro) => {
    console.log('Eliminando libro con id:', id);
    const confirmar = confirm(`¿Eliminar el libro "${libro.titulo}"?`)
    console.log(confirmar)
    if (confirmar) return
    await deleteLibro(libro.id)
    cargarLibros()
  }

  return {
    libros,
    busqueda,
    buscar,
    agregarLibro,
    editarLibro,
    eliminarLibro
  }
}
