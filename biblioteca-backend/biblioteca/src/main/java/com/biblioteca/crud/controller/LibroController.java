package com.biblioteca.crud.controller;

import com.biblioteca.crud.model.Libro;
import com.biblioteca.crud.repository.LibroRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/libros")
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
public Libro agregarLibro(
        @RequestParam("titulo") String titulo,
        @RequestParam("autor") String autor,
        @RequestParam("anio") String anioStr,
        @RequestParam(value = "portada", required = false) MultipartFile portadaFile
) throws IOException {

    Libro libro = new Libro();
    libro.setTitulo(titulo);
    libro.setAutor(autor);
    libro.setAnio(Integer.parseInt(anioStr));

    if (portadaFile != null && !portadaFile.isEmpty()) {
        // ✅ Ruta absoluta segura en tu proyecto
        String rutaBase = System.getProperty("user.dir") + File.separator + "uploads";
        File directorio = new File(rutaBase);
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


    @PutMapping(path = "/{id}", consumes = "multipart/form-data") 
    public Libro actualizarLibro(@PathVariable Long id, 
                             @RequestParam("titulo") String titulo,
                             @RequestParam("autor") String autor,
                             @RequestParam("anio") String anio,
                             @RequestParam(value = "portada", required = false) MultipartFile portadaFile) throws IOException {

    Libro libro = repo.findById(id).orElseThrow();

    libro.setTitulo(titulo);
    libro.setAutor(autor);
    libro.setAnio(Integer.parseInt(anio));

    if (portadaFile != null && !portadaFile.isEmpty()) {
        String nombreArchivo = System.currentTimeMillis() + "_" + portadaFile.getOriginalFilename();
        File directorio = new File(System.getProperty("user.dir") + File.separator + "uploads");
        directorio.mkdirs();
        File destino = new File(directorio, nombreArchivo);
        portadaFile.transferTo(destino);
        libro.setPortada(nombreArchivo);
    }

    return repo.save(libro);
}


    @DeleteMapping("/{id}")
    public void eliminarLibro(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @GetMapping("/buscar")
public List<Libro> buscarLibros(@RequestParam("q") String q) {
    return repo.findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(q, q);
}

}
