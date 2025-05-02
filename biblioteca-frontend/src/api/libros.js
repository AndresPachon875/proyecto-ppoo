import axios from 'axios'

const API_URL = 'http://localhost:8080/api/libros'

export const getLibros = () => axios.get(API_URL)
export const createLibro = (libro) => axios.post(API_URL, libro)