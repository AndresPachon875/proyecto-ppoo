package com.biblioteca.crud.controller;

import com.biblioteca.crud.dto.LibroDTO;
import com.biblioteca.crud.model.Libro;
import com.biblioteca.crud.service.LibroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/libros")
public class LibroController {

    private final LibroService libroService;

    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @GetMapping
    public ResponseEntity<List<Libro>> listarLibros() {
        List<Libro> libros = libroService.obtenerTodosLosLibros();
        return new ResponseEntity<>(libros, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> obtenerLibroPorId(@PathVariable Long id) {
        Optional<Libro> libro = libroService.obtenerLibroPorId(id);
        return libro.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado con ID: " + id));
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Libro> agregarLibro(@ModelAttribute LibroDTO libroDTO) {
        try {
            Libro nuevoLibro = libroService.guardarLibro(
                    new Libro(libroDTO.getTitulo(), libroDTO.getAutor(), libroDTO.getAnio(), null, libroDTO.getDescripcion()),
                    libroDTO.getPortadaFile()
            );
            return new ResponseEntity<>(nuevoLibro, HttpStatus.CREATED);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al guardar la portada: " + e.getMessage());
        }
    }

    @PutMapping(path = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Libro> actualizarLibro(@PathVariable Long id, @ModelAttribute LibroDTO libroDTO) {
        try {
            Libro libroActualizado = libroService.actualizarLibro(id,
                    new Libro(libroDTO.getTitulo(), libroDTO.getAutor(), libroDTO.getAnio(), null, libroDTO.getDescripcion()),
                    libroDTO.getPortadaFile()
            );

            if (libroActualizado != null) {
                return new ResponseEntity<>(libroActualizado, HttpStatus.OK);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado con ID: " + id);
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar la portada: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable Long id) {
        libroService.eliminarLibro(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Libro>> buscarLibros(@RequestParam("q") String query) {
        List<Libro> librosEncontrados = libroService.buscarLibros(query);
        return new ResponseEntity<>(librosEncontrados, HttpStatus.OK);
    }
}