import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-indigo-700 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">📚 Biblioteca</Link>
      <Link
        to="/crear"
        className="bg-white text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100 font-semibold transition"
      >
        Crear Libro
      </Link>
    </nav>
  );
}

export default Navbar;
