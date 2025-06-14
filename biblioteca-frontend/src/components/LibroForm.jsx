import { useEffect, useState } from "react";

function LibroForm({ onAdd, libroInicial = null, modo = "crear" }) {
  const [libro, setLibro] = useState({
    id: null, 
    titulo: '',
    autor: '',
    anio: '',
    descripcion: '',
    portadaFile: null 
  });

  const [vistaPrevia, setVistaPrevia] = useState(null);

  useEffect(() => {
    if (libroInicial) {
      setLibro({
        id: libroInicial.id, 
        titulo: libroInicial.titulo || '',
        autor: libroInicial.autor || '',
        anio: libroInicial.anio || '',
        descripcion: libroInicial.descripcion || '',
        portadaFile: null 
      });
      
      if (libroInicial.portada) {
        
        setVistaPrevia(`http://localhost:8080/uploads/${libroInicial.portada}`);
      } else {
        setVistaPrevia(null);
      }
    } else {

      setLibro({
        id: null,
        titulo: '',
        autor: '',
        anio: '',
        descripcion: '',
        portadaFile: null
      });
      setVistaPrevia(null);
    }
  }, [libroInicial]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "portadaFile") { 
      const archivo = files[0];
      setLibro({ ...libro, portadaFile: archivo });

      if (archivo) {
        const reader = new FileReader();
        reader.onloadend = () => setVistaPrevia(reader.result);
        reader.readAsDataURL(archivo);
      } else {
        setVistaPrevia(libroInicial && libroInicial.portada ? `http://localhost:8080/uploads/${libroInicial.portada}` : null);
      }
    } else {
      setLibro({ ...libro, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onAdd(libro);
    if (modo === "crear") {
      setLibro({ titulo: '', autor: '', anio: '', descripcion: '', portadaFile: null });
      setVistaPrevia(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-indigo-400 shadow p-6 rounded-md w-lg">
      <input
        name="titulo"
        placeholder="Título"
        value={libro.titulo}
        onChange={handleChange}
        className="border border-indigo-300 p-2 w-full rounded"
        required
      />
      <input
        name="autor"
        placeholder="Autor"
        value={libro.autor}
        onChange={handleChange}
        className="border border-indigo-300 p-2 w-full rounded"
        required
      />
      <input
        name="anio"
        placeholder="Año"
        value={libro.anio}
        onChange={handleChange}
        type="number"
        className="border border-indigo-300 p-2 w-full rounded"
        required
      />
      <textarea
        name="descripcion" 
        placeholder="Descripción"
        value={libro.descripcion}
        onChange={handleChange}
        className="border border-indigo-300 p-2 w-full rounded"
      />
      <input
        name="portadaFile" 
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="border border-indigo-300 p-2 w-full rounded"
      />
      {vistaPrevia && (
        <div>
          <p className="text-sm text-gray-600">Vista previa:</p>
          <img src={vistaPrevia} alt="Vista previa" className="max-w-[200px] border mt-1" />
        </div>
      )}
      <div className="flex w-full justify-center items-center">
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
        {modo === "editar" ? "Actualizar" : "Agregar"}
      </button>
      </div>
    </form>
  );
}

export default LibroForm;