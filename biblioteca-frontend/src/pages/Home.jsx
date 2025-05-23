import { useLibros } from '../hooks/useLibro';
import LibroList from '../components/LibroList';
import SearchBar from '../components/SearchBar';

function Home() {
  const {
    libros,
    busqueda,
    buscar,
    editarLibro,
    eliminarLibro
  } = useLibros();

  return (
    <section className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-indigo-700 text-center">Libros Disponibles</h1>

      {/* Barra de búsqueda */}
      <div className="w-full grid">
        <SearchBar value={busqueda} onChange={buscar} />
      </div>

      {/* Lista de libros */}
      <LibroList
        libros={libros}
        onEdit={editarLibro}
        onDelete={eliminarLibro}
      />
    </section>
  );
}

export default Home;
