import { useEffect, useState } from 'react'
import { getLibros, createLibro, updateLibro, deleteLibro, buscarLibros } from '../api/libros'

export function useLibros() {
  const [libros, setLibros] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const cargarLibros = async () => {
    const res = await getLibros()
    setLibros(res.data)
  }

  const buscar = async (valor) => {
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

  return {
    libros,
    busqueda,
    setBusqueda,
    buscar,
    agregarLibro,
    editarLibro,
    eliminarLibro
  }
}
