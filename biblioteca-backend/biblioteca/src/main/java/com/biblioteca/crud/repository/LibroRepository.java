package com.biblioteca.crud.repository;

import com.biblioteca.crud.model.Libro; 
import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.data.jpa.repository.Query; 
import org.springframework.data.repository.query.Param; 
import java.util.List;

public interface LibroRepository extends JpaRepository<Libro, Long> {

    List<Libro> findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(String searchTerm, String searchTerm2);

    @Query("SELECT l FROM Libro l WHERE LOWER(l.titulo) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(l.autor) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Libro> buscarLibrosPorTituloOAutor(@Param("query") String query);

}
