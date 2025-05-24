package com.biblioteca.crud.controller;

import com.biblioteca.crud.model.Libro;
import com.biblioteca.crud.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/libros")
public class LibroController {

    private final LibroRepository repo;

    @Value("${upload.path:uploads}")
    private String uploadPath;

    public LibroController(LibroRepository repo) {
        this.repo = repo;
    }

    // ========== MÉTODOS GET (ordenados por especificidad) ==========

    // 1. Listar todos los libros (ruta base)
    @GetMapping
    public List<Libro> listarLibros() {
        return repo.findAll();
    }

    // 2. Buscar libros (ruta específica - ANTES de /{id})
    @GetMapping("/buscar")
    public List<Libro> buscarLibros(@RequestParam("q") String q) {
        return repo.findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(q, q);
    }

    // 3. Obtener libro por ID (ruta con parámetro - AL FINAL)
    @GetMapping("/{id}")
    public Libro obtenerLibroPorId(@PathVariable Long id) {
        System.out.println("Buscando libro con ID: " + id);
        return repo.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado con ID: " + id));
    }

    // ========== MÉTODO POST ==========

    @PostMapping
    public Libro agregarLibro(
            @RequestParam("titulo") String titulo,
            @RequestParam("autor") String autor,
            @RequestParam("anio") String anioStr,
            @RequestParam(value = "portada", required = false) MultipartFile portadaFile
    ) throws IOException {

        if (titulo == null || titulo.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El título es obligatorio");
        }
        if (autor == null || autor.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El autor es obligatorio");
        }

        int anio;
        try {
            anio = Integer.parseInt(anioStr);
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El año debe ser un número entero válido");
        }

        Libro libro = new Libro();
        libro.setTitulo(titulo);
        libro.setAutor(autor);
        libro.setAnio(anio);

        if (portadaFile != null && !portadaFile.isEmpty()) {
            File directorio = new File(uploadPath);
            if (!directorio.exists()) {
                directorio.mkdirs();
            }

            String nombreArchivo = System.currentTimeMillis() + "_" + portadaFile.getOriginalFilename();
            File archivoDestino = new File(directorio, nombreArchivo);
            portadaFile.transferTo(archivoDestino);

            libro.setPortada(nombreArchivo);
        }

        return repo.save(libro);
    }

    // ========== MÉTODO PUT ==========

    @PutMapping(path = "/{id}", consumes = "multipart/form-data")
    public Libro actualizarLibro(@PathVariable Long id,
                                 @RequestParam("titulo") String titulo,
                                 @RequestParam("autor") String autor,
                                 @RequestParam("anio") String anioStr,
                                 @RequestParam(value = "portada", required = false) MultipartFile portadaFile) throws IOException {

        Libro libro = repo.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));

        if (titulo == null || titulo.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El título es obligatorio");
        }
        if (autor == null || autor.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El autor es obligatorio");
        }

        int anio;
        try {
            anio = Integer.parseInt(anioStr);
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El año debe ser un número entero válido");
        }

        libro.setTitulo(titulo);
        libro.setAutor(autor);
        libro.setAnio(anio);

        if (portadaFile != null && !portadaFile.isEmpty()) {
            // Eliminar portada anterior si existe
            if (libro.getPortada() != null) {
                File archivoAnterior = new File(uploadPath, libro.getPortada());
                if (archivoAnterior.exists()) {
                    archivoAnterior.delete();
                }
            }

            File directorio = new File(uploadPath);
            directorio.mkdirs();
            String nombreArchivo = System.currentTimeMillis() + "_" + portadaFile.getOriginalFilename();
            File destino = new File(directorio, nombreArchivo);
            portadaFile.transferTo(destino);
            libro.setPortada(nombreArchivo);
        }

        return repo.save(libro);
    }

    // ========== MÉTODO DELETE ==========

    @DeleteMapping("/{id}")
    public void eliminarLibro(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado");
        }
        repo.deleteById(id);
    }
}