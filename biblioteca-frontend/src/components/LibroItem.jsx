function LibroItem({ libro, onEdit, onDelete }) {
  const { titulo, autor, anio, descripcion, portada } = libro;

  return (
    <div className="bg-indigo-100 shadow-lg rounded-lg p-4 w-full max-w-md mx-auto space-y-2">
      <h2 className="text-2xl font-bold text-indigo-800">{titulo}</h2>
      <p className="text-gray-700">Autor: {autor}</p>
      <p className="text-gray-700">Año: {anio}</p>
      <p className="text-gray-600 text-sm line-clamp-3">{descripcion}</p>
      {portada && (
        <img src={`http://localhost:8080/${portada}`} alt="Portada" className="max-w-full h-40 object-contain mx-auto" />
      )}
      <div className="flex justify-end gap-2 mt-2">
        <button onClick={() => onEdit(libro)} className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800">
          Editar
        </button>
        <button onClick={() => onDelete(libro.id)} className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default LibroItem;
