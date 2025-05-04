import React from "react";

function LibroItem({ libro }) {
  const { titulo, autor, anio } = libro;
  return <div>
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-80 h-40 flex flex-col justify-between items-center">
      <h2 className="text-xl font-bold">{titulo}</h2>
      <p className="text-gray-700">Autor: {autor}</p>
      <p className="text-gray-700">Año: {anio}</p>
    </div>
    <div className="flex justify-center items-center gap-2">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Editar</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
    </div>
  </div>;
}

export default LibroItem;
