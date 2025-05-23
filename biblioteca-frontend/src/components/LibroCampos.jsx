import { useState } from "react";
import LibroCampos from "./LibroCampos";

function LibroForm({ onAdd }) {
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: "",
    autor: "",
    anio: "",
    portada: null,
  });

  const [vistaPrevia, setVistaPrevia] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoLibro({ ...nuevoLibro, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(nuevoLibro);
    setNuevoLibro({ titulo: "", autor: "", anio: "", portada: null });
    setVistaPrevia(null);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md">
      <LibroCampos
        libro={nuevoLibro}
        onChange={handleChange}
        vistaPrevia={vistaPrevia}
        setVistaPrevia={setVistaPrevia}
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Agregar
      </button>
    </form>
  );
}

export default LibroForm;
