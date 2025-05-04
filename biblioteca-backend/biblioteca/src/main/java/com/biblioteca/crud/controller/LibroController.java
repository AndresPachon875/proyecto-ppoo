package com.biblioteca.crud.controller;


import com.biblioteca.crud.model.Libro;
import com.biblioteca.crud.repository.LibroRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "*")
public class LibroController {

    private final LibroRepository repo;

    public LibroController(LibroRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Libro> listarLibros() {
        return repo.findAll();
    }

    @PostMapping
    public Libro agregarLibro(@RequestBody Libro libro) {
        return repo.save(libro);
    }

    @PutMapping("/{id}")
    public Libro actualizarLibro(@PathVariable Long id, @RequestBody Libro libro) {
        libro.setId(id);
        return repo.save(libro);
    }

    @DeleteMapping("/{id}")
    public void eliminarLibro(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @GetMapping("/buscar")
    public List<Libro> buscarLibrosPorNombre(@RequestParam("q") String palabra) {
    return repo.findByTituloContainingIgnoreCase(palabra);
    }

}
