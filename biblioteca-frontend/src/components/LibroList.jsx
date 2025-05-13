import { useState } from 'react'

function LibroList({ libros, onEdit, onDelete }) {
  const [editando, setEditando] = useState(null)
  const [libroEditado, setLibroEditado] = useState({
    titulo: '',
    autor: '',
    anio: '',
    portada: null
  })
  const [vistaPrevia, setVistaPrevia] = useState(null)

  const manejarCambio = (e) => {
    const { name, value, files } = e.target
    if (name === 'portada') {
      const archivo = files[0]
      setLibroEditado({ ...libroEditado, portada: archivo })
      if (archivo) {
        const reader = new FileReader()
        reader.onloadend = () => setVistaPrevia(reader.result)
        reader.readAsDataURL(archivo)
      } else {
        setVistaPrevia(null)
      }
    } else {
      setLibroEditado({ ...libroEditado, [name]: value })
    }
  }

  const iniciarEdicion = (libro) => {
    setEditando(libro.id)
    setLibroEditado({
      titulo: libro.titulo,
      autor: libro.autor,
      anio: libro.anio,
      portada: null
    })
    setVistaPrevia(null)
  }

  const guardarCambios = () => {
    onEdit(editando, libroEditado)
    setEditando(null)
    setVistaPrevia(null)
  }

  return (
    <ul className="space-y-4 w-full max-w-3xl">
      {libros.map(libro => (
        <li key={libro.id} className="border p-4 rounded shadow flex gap-4 items-start">
          {/* Imagen a la izquierda */}
          <div className="w-32 flex-shrink-0">
            {editando === libro.id ? (
              <>
                <input
                  type="file"
                  name="portada"
                  accept="image/*"
                  onChange={manejarCambio}
                  className="mb-2"
                />
                {vistaPrevia && (
                  <img src={vistaPrevia} alt="Vista previa" className="w-full h-auto border" />
                )}
              </>
            ) : (
              libro.portada && (
                <img
                  src={`http://localhost:8080/uploads/${libro.portada}`}
                  alt="Portada"
                  className="w-full h-auto border"
                />
              )
            )}
          </div>

          {/* Información del libro */}
          <div className="flex-grow space-y-1">
            {editando === libro.id ? (
              <>
                <input
                  type="text"
                  name="titulo"
                  value={libroEditado.titulo}
                  onChange={manejarCambio}
                  className="border p-1 w-full"
                />
                <input
                  type="text"
                  name="autor"
                  value={libroEditado.autor}
                  onChange={manejarCambio}
                  className="border p-1 w-full"
                />
                <input
                  type="number"
                  name="anio"
                  value={libroEditado.anio}
                  onChange={manejarCambio}
                  className="border p-1 w-full"
                />
                <div className="mt-2">
                  <button
                    onClick={guardarCambios}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditando(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">{libro.titulo}</h2>
                <p>{libro.autor}</p>
                <p>{libro.anio}</p>
                <div className="mt-2">
                  <button
                    onClick={() => iniciarEdicion(libro)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(libro.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default LibroList
