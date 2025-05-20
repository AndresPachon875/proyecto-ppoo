import React from "react";

function LibroItem({ libro }) {
  const { titulo, autor, anio, descripcion, portada} = libro;

  console.log(libro)
  return <div>
    <div className="bg-indigo-800 shadow-md rounded-lg p-4 m-2 w-80 h-40 flex flex-col justify-between items-center">
      <h2 className="text-xl font-bold">{titulo}</h2>
      <p className="text-white">Autor: {autor}</p>
      <p className="text-white">Año: {anio}</p>
      <p className="text-white">Descripción: {descripcion}</p>
      <p className="text-white">Portada: {portada}</p>
    </div>
    <div className="flex justify-center items-center gap-2">
      <button className="bg-blue-900 text-white px-4 py-2 rounded hover:scale-105 duration-700 ease-in-out">Editar</button>
      <button className="bg-red-900 text-white px-4 py-2 rounded hover:scale-105 duration-700 ease-in-out">Eliminar</button>
    </div>
  </div>;   
}

export default LibroItem;
