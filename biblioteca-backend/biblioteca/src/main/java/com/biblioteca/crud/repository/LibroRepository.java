package com.biblioteca.crud.repository;

import com.biblioteca.crud.model.Libro; // Importamos nuestro modelo Libro
import org.springframework.data.jpa.repository.JpaRepository; // La interfaz base de Spring Data JPA
import org.springframework.data.jpa.repository.Query; // Para definir consultas personalizadas
import org.springframework.data.repository.query.Param; // Para usar parámetros nombrados en las consultas
import java.util.List; // Para retornar listas de libros

public interface LibroRepository extends JpaRepository<Libro, Long> {

    List<Libro> findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(String searchTerm, String searchTerm2);

    @Query("SELECT l FROM Libro l WHERE LOWER(l.titulo) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(l.autor) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Libro> buscarLibrosPorTituloOAutor(@Param("query") String query);

}
