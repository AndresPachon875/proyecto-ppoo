import LibroItem from './LibroItem';

function LibroList({ libros, onEdit, onDelete }) {
  if (libros.length === 0) {
    return <p className="text-center text-gray-500">No hay libros disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {libros.map((libro, index) => {
        const isLastOdd = libros.length % 2 !== 0 && index === libros.length - 1;
        return (
          <div
            key={libro.id}
            className={isLastOdd ? 'md:col-span-2 flex justify-center' : ''}
          >
            <LibroItem libro={libro} onEdit={onEdit} onDelete={onDelete} />
          </div>
        );
      })}
    </div>
  );
}

export default LibroList;
