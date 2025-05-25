package com.biblioteca.crud.dto;

import org.springframework.web.multipart.MultipartFile;

public class LibroDTO {
    private String titulo;
    private String autor;
    private int anio;
    private String descripcion; // ¡Nuevo campo!
    private MultipartFile portadaFile;

    public LibroDTO() {
    }


    public LibroDTO(String titulo, String autor, int anio, String descripcion, MultipartFile portadaFile) {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.descripcion = descripcion; // Inicializa el nuevo campo
        this.portadaFile = portadaFile;
    }

    // Getters y Setters
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public int getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public MultipartFile getPortadaFile() {
        return portadaFile;
    }

    public void setPortadaFile(MultipartFile portadaFile) {
        this.portadaFile = portadaFile;
    }
}