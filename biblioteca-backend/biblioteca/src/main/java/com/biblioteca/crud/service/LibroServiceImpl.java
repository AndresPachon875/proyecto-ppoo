package com.biblioteca.crud.service;

import com.biblioteca.crud.model.Libro;
import com.biblioteca.crud.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class LibroServiceImpl implements LibroService {

    private final LibroRepository libroRepository;
    private static final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + File.separator + "uploads";

    @Autowired
    public LibroServiceImpl(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
        File uploadDirectory = new File(UPLOAD_DIRECTORY);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }
    }

    @Override
    public Libro guardarLibro(Libro libro, MultipartFile portadaFile) throws IOException {
        System.out.println("Guardando libro: " + libro.getTitulo());

        if (portadaFile != null && !portadaFile.isEmpty()) {
            String nombreArchivo = System.currentTimeMillis() + "_" + portadaFile.getOriginalFilename();
            File archivoDestino = new File(UPLOAD_DIRECTORY, nombreArchivo);
            portadaFile.transferTo(archivoDestino);
            libro.setPortada(nombreArchivo);
        }


        return libroRepository.save(libro);
    }

    @Override
    public List<Libro> obtenerTodosLosLibros() {
        System.out.println("Obteniendo todos los libros.");
        return libroRepository.findAll();
    }

    @Override
    public Optional<Libro> obtenerLibroPorId(Long id) {
        System.out.println("Buscando libro con ID: " + id);
        return libroRepository.findById(id);
    }

    @Override
    public void eliminarLibro(Long id) {
        System.out.println("Eliminando libro con ID: " + id);
        libroRepository.deleteById(id);
    }

    @Override
    public List<Libro> buscarLibros(String query) {
        System.out.println("Buscando libros con query: '" + query + "'");
        return libroRepository.buscarLibrosPorTituloOAutor(query);
    }

    @Override
    public Libro actualizarLibro(Long id, Libro libroDetails, MultipartFile portadaFile) throws IOException {
        return libroRepository.findById(id).map(libroExistente -> {
            libroExistente.setTitulo(libroDetails.getTitulo());
            libroExistente.setAutor(libroDetails.getAutor());
            libroExistente.setAnio(libroDetails.getAnio());
            libroExistente.setDescripcion(libroDetails.getDescripcion()); // ¡Actualiza la descripción!

            if (portadaFile != null && !portadaFile.isEmpty()) {
                String nombreArchivo = System.currentTimeMillis() + "_" + portadaFile.getOriginalFilename();
                File archivoDestino = new File(UPLOAD_DIRECTORY, nombreArchivo);
                try {
                    portadaFile.transferTo(archivoDestino);
                } catch (IOException e) {
                    throw new RuntimeException("Error al guardar la nueva portada", e);
                }
                libroExistente.setPortada(nombreArchivo);
            }

            System.out.println("Actualizando libro con ID: " + id);
            return libroRepository.save(libroExistente);
        }).orElse(null);
    }
}