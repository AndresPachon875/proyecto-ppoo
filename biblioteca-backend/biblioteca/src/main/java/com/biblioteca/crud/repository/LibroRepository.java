package com.biblioteca.crud.repository;

import com.biblioteca.crud.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibroRepository extends JpaRepository<Libro, Long> {
}
