import axios from 'axios'

const API_URL = 'http://localhost:8080/api/libros'

export const getLibros = () => axios.get(API_URL)
export const createLibro = (libro) => {
    const formData = new FormData()
    formData.append("titulo", libro.titulo)
    formData.append("autor", libro.autor)
    formData.append("anio", libro.anio)
    if (libro.portada) formData.append("portada", libro.portada)
    return axios.post(API_URL, formData)
  }
  
  export const updateLibro = (id, libro) => {
  const formData = new FormData()
  formData.append("titulo", libro.titulo)
  formData.append("autor", libro.autor)
  formData.append("anio", libro.anio)
  if (libro.portada) {
    formData.append("portada", libro.portada)
  }

  return axios.put(`http://localhost:8080/api/libros/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const buscarLibros = (query) =>
  axios.get(`http://localhost:8080/api/libros/buscar?q=${query}`)

  
  export const deleteLibro = (id) => axios.delete(`${API_URL}/${id}`)