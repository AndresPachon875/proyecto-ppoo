import axios from 'axios'

const API_URL = 'http://localhost:8080/api/libros'

export const getLibros = () => axios.get(API_URL)
export const createLibro = (libro) => axios.post(API_URL, libro)
export const updateLibro = (id, libro) => axios.put(`${API_URL}/${id}`, libro)
export const deleteLibro = (id) => axios.delete(`${API_URL}/${id}`)
export const searchLibros = (query) => axios.get(`${API_URL}?search=${query}`)
export const getLibroById = (id) => axios.get(`${API_URL}/${id}`)
