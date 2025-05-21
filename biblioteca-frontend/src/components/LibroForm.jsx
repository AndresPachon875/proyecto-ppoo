import { useState } from "react";

function LibroForm({ onAdd }) {
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: '',
    autor: '',
    anio: '',
    portada: null
  })

  const [vistaPrevia, setVistaPrevia] = useState(null)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'portada') {
      const archivo = files[0]
      setNuevoLibro({ ...nuevoLibro, portada: archivo })

      if (archivo) {
        const reader = new FileReader()
        reader.onloadend = () => setVistaPrevia(reader.result)
        reader.readAsDataURL(archivo)
      } else {
        setVistaPrevia(null)
      }
    } else {
      setNuevoLibro({ ...nuevoLibro, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Enviando libro:", nuevoLibro)
    onAdd(nuevoLibro)
    setNuevoLibro({ titulo: '', autor: '', anio: '', portada: null })
    setVistaPrevia(null)
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md">
      <input
        name="titulo"
        placeholder="Título"
        value={nuevoLibro.titulo}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="autor"
        placeholder="Autor"
        value={nuevoLibro.autor}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="anio"
        placeholder="Año"
        value={nuevoLibro.anio}
        onChange={handleChange}
        type="number"
        className="border p-2 w-full"
        required
      />
      <input
        name="portada"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      {vistaPrevia && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">Vista previa:</p>
          <img src={vistaPrevia} alt="Vista previa de la portada" className="max-w-[200px] border mt-1" />
        </div>
      )}
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Agregar
      </button>
    </form>
  );
}

export default LibroForm
