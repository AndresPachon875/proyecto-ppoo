import { useState } from 'react';
import LibroList from '../components/LibroList';
import LibroForm from '../components/LibroForm';
import SearchBar from '../components/SearchBar';
import { useLibros } from '../hooks/UseLibro';

function Home() {
  const { libros, busqueda, buscar, eliminarLibro, agregarLibro, editarLibro } = useLibros();
  const [libroEditando, setLibroEditando] = useState(null); 
  const [mostrarFormularioEdicion, setMostrarFormularioEdicion] = useState(false); 

  const handleEdit = (libro) => {
    setLibroEditando(libro); 
    setMostrarFormularioEdicion(true); 
  };

  const handleUpdate = async (libroActualizado) => {
    await editarLibro(libroActualizado); 
    setMostrarFormularioEdicion(false); 
    setLibroEditando(null); 
  };

  const handleCancelEdit = () => {
    setMostrarFormularioEdicion(false);
    setLibroEditando(null);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-6">Nuestra Biblioteca</h1>

      <div className="mb-8 w-full max-w-md">
        <SearchBar value={busqueda} onChange={buscar} />
      </div>

      {mostrarFormularioEdicion && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6">Editar Libro</h2>
            <LibroForm
              libroInicial={libroEditando}
              modo="editar"
              onAdd={handleUpdate}
            />
            <button
              onClick={handleCancelEdit}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      
      <LibroList
        libros={libros}
        onEdit={handleEdit}
        onDelete={eliminarLibro}
      />
    </div>
  );
}

export default Home;