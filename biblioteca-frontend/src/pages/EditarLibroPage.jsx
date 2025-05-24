import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLibroById, updateLibro } from '../api/libros'; // asegúrate de tener esta función
import LibroForm from '../components/LibroForm';

function EditarLibro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libroActual, setLibroActual] = useState(null);

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const { data } = await getLibroById(id);
        setLibroActual(data);
      } catch (error) {
        console.error('Error al obtener el libro:', error);
      }
    };

    fetchLibro();
  }, [id]);

  const handleActualizar = async (libroEditado) => {
    try {
      await updateLibro(id, libroEditado);
      navigate('/'); // redirige después de actualizar
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
    }
  };

  if (!libroActual) return <p className="text-center mt-10">Cargando libro...</p>;

  return (
    <section className="grid place-items-center bg-gray-100">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Editar Libro</h2>
      <LibroForm
        libroInicial={libroActual}
        modo="editar"
        onAdd={handleActualizar}
      />
    </section>
  );
}

export default EditarLibro;
