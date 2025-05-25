import { useNavigate } from 'react-router-dom';
import LibroForm from '../components/LibroForm';
import { useLibros } from '../hooks/UseLibro'; 

function CrearLibro() {
  const navigate = useNavigate(); 
  const { agregarLibro } = useLibros(); 

  const handleAdd = async (nuevoLibro) => {
    await agregarLibro(nuevoLibro); 
    navigate('/'); 
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Agregar Nuevo Libro</h1>
        <LibroForm onAdd={handleAdd} modo="crear" />
      </div>
    </div>
  );
}

export default CrearLibro;