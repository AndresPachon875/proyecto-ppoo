function LibroEditForm({ libro, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={libro.titulo}
        onChange={onChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="autor"
        placeholder="Autor"
        value={libro.autor}
        onChange={onChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="anio"
        placeholder="Año"
        value={libro.anio}
        onChange={onChange}
        className="border p-2 rounded"
      />
    </div>
  )
}

export default LibroEditForm
