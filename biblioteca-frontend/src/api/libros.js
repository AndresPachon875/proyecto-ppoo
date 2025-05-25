import axios from 'axios'

const API_URL = 'http://localhost:8080/api/libros'

export const getLibros = () => axios.get(API_URL)

export const createLibro = (libro) => {
    const formData = new FormData()
    formData.append("titulo", libro.titulo)
    formData.append("autor", libro.autor)
    formData.append("anio", libro.anio)
    
    formData.append("descripcion", libro.descripcion || ''); 

    if (libro.portadaFile) { 
        formData.append("portadaFile", libro.portadaFile);
    }

    return axios.post(API_URL, formData)
}


export const updateLibro = (id, libro) => {
    const formData = new FormData()
    formData.append("titulo", libro.titulo)
    formData.append("autor", libro.autor)
    formData.append("anio", libro.anio)
    formData.append("descripcion", libro.descripcion || '');

    
    if (libro.portadaFile) { 
        formData.append("portadaFile", libro.portadaFile);
    }

    return axios.put(`${API_URL}/${id}`, formData) 
}

export const getLibroById = (id) => axios.get(`${API_URL}/${id}`);

export const buscarLibros = (query) =>
  axios.get(`${API_URL}/buscar?q=${query}`) 

export const deleteLibro = (id) => axios.delete(`${API_URL}/${id}`)