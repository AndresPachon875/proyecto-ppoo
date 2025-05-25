package com.biblioteca.crud.service;

import com.biblioteca.crud.model.Libro;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface LibroService {

    Libro guardarLibro(Libro libro, MultipartFile portadaFile) throws IOException;

    List<Libro> obtenerTodosLosLibros();

    Optional<Libro> obtenerLibroPorId(Long id);

    void eliminarLibro(Long id);

    List<Libro> buscarLibros(String query);

    Libro actualizarLibro(Long id, Libro libroDetails, MultipartFile portadaFile) throws IOException;
}