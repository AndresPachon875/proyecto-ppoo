import { useEffect, useState } from 'react'
import {
  getLibros,
  createLibro,
  updateLibro,
  deleteLibro,
  buscarLibros,
  getLibroById
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

  const cargarLibroPorId = async (id) => {
    const res = await getLibroById(id)
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

  const eliminarLibro = async (id) => {
  console.log('Intentando eliminar libro con ID:', id); // 👈 Imprime esto
  try {
    await deleteLibro(id); 
    setLibros((prev) => prev.filter((libro) => libro.id !== id));
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    alert('No se pudo eliminar el libro');
  }
};

  return {
    libros,
    busqueda,
    buscar,
    agregarLibro,
    editarLibro,
    eliminarLibro,
    cargarLibroPorId,
  }
}
