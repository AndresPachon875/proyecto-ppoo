import Navbar from './components/Navbar.jsx'
import LibroForm from './components/LibroForm.jsx'
import LibroList from './components/LibroList.jsx'
import SearchBar from './components/SearchBar.jsx'
import { useLibros } from './hooks/UseLibro.jsx'

function App() {
  const {
    libros,
    busqueda,
    buscar,
    agregarLibro,
    editarLibro,
    eliminarLibro
  } = useLibros()

  return (
    <main className='container font-serif mx-auto'>
      <Navbar />
      <div className='w-full h-full grid grid-cols-1 gap-4 p-4 place-items-center'>  
        <h1 className='text-5xl'>Biblioteca</h1>
        <SearchBar value={busqueda} onChange={buscar} />
        <LibroForm onAdd={agregarLibro} />
        <LibroList
          libros={libros}
          onEdit={editarLibro}
          onDelete={eliminarLibro}
        />
      </div>
    </main>
  )
}

export default App
