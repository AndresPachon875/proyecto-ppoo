function LibroList({ libros }) {
    return (
      <ul>
        {libros.map(libro => (
          <li key={libro.id}>{libro.titulo} - {libro.autor} ({libro.anio})</li>
        ))}
      </ul>
    )
  }
  
  export default LibroList
  