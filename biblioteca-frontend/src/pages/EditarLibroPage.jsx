import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLibroById, updateLibro } from '../services/libroService';
import LibroForm from '../components/LibroForm';

function EditarLibroPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    getLibroById(id)
      .then((res) => setLibro(res.data))
      .catch(() => navigate('/'));
  }, [id, navigate]);

  const handleUpdate = async (datosActualizados) => {
    try {
      await updateLibro(id, datosActualizados);
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Editar Libro</h2>
      {libro ? (
        <LibroForm onAdd={handleUpdate} libroInicial={libro} modo="editar" />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default EditarLibroPage;
