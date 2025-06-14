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
    try {
      const res = await getLibros() 
      setLibros(res.data) 
    } catch (error) {
      console.error("Error al cargar libros:", error); 
    }
  }

  const buscar = async (texto) => {
    setBusqueda(texto) 
    if (texto === '') return cargarLibros()
    try {
      const res = await buscarLibros(texto) 
      setLibros(res.data)
    } catch (error) {
      console.error("Error al buscar libros:", error);
    }
  }

  const agregarLibro = async (libro) => {
    try {
      
      await createLibro(libro) 
      cargarLibros() 
    } catch (error) {
      console.error("Error al agregar libro:", error);
    }
  }

  const editarLibro = async (libro) => {
    try {
      
      await updateLibro(libro.id, libro) 
      cargarLibros() 
    } catch (error) {
      console.error("Error al editar libro:", error);
    }
  }

  const eliminarLibro = async (libro) => {
    console.log('Eliminando libro con id:', libro.id);

    const confirmar = confirm(`¿Eliminar el libro "${libro.titulo}"?`) 
    console.log(confirmar) 
    if (!confirmar) return

    try {
      await deleteLibro(libro.id) 
      cargarLibros()
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
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