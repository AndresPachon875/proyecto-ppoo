import LibroForm from '../components/LibroForm';
import { useLibros } from '../hooks/useLibro';
import { useNavigate } from 'react-router-dom';

function CrearLibro() {
  const { agregarLibro } = useLibros();
  const navigate = useNavigate();

  const handleAgregar = async (nuevoLibro) => {
    await agregarLibro(nuevoLibro);
    navigate('/'); // Redirige al Home al crear
  };

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Crear Nuevo Libro</h2>
      <LibroForm onAdd={handleAgregar} />
    </section>
  );
}

export default CrearLibro;
