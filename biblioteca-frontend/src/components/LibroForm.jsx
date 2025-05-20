import { useState } from "react";

function LibroForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !year) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", title);
    formData.append("autor", author);
    formData.append("anio", year);
    formData.append("descripcion", description);
    if (image) {
      formData.append("portada", image);
    }

    try {
      await onAdd(formData);
      // Limpiar formulario
      setTitle("");
      setAuthor("");
      setYear("");
      setDescription("");
      setImage(null);
      setError("");
    } catch (err) {
      setError("Ocurrió un error al guardar el libro.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-white rounded shadow-md"
    >
      <h2 className="text-xl font-semibold">Agregar nuevo libro</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Año"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full"
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Agregar
      </button>
    </form>
  );
}

export default LibroForm;
