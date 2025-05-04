import LibroItem from "./libro/LibroItem"

function LibroList({ libros }) {
    return (
      <ul>
        {libros.map(libro => (
          <LibroItem key={libro.id} libro={libro}></LibroItem>
        ))}
      </ul>
    )
  }
  
  export default LibroList
  