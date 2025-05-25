package com.biblioteca.crud.config;

import org.springframework.context.annotation.Configuration; // Indica que esta clase es una fuente de definiciones de beans de Spring
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry; // Para registrar manejadores de recursos
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // Interfaz para personalizar la configuración de Spring MVC
import java.io.File; // Para trabajar con rutas de archivos

/**
 * Esta clase configura Spring MVC para servir archivos estáticos desde el directorio 'uploads'.
 * Esto permite que las imágenes de las portadas de los libros sean accesibles a través de una URL.
 *
 * @Configuration: Le dice a Spring que esta clase contiene definiciones de beans de configuración.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Definimos la ruta donde se guardan las portadas.
    // Es la misma ruta que usamos en LibroServiceImpl.
    // Usamos 'user.dir' para obtener la ruta del directorio de trabajo actual del proyecto.
    private static final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + File.separator + "uploads";

    /**
     * Este método se usa para añadir manejadores de recursos estáticos.
     * Aquí, estamos mapeando una URL (ej. "/uploads/**") a una ubicación física en el sistema de archivos.
     *
     * @param registry El registro para añadir manejadores de recursos.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Añadimos un manejador de recursos para la ruta "/uploads/**"
        // Esto significa que cualquier solicitud que empiece con "/uploads/" será manejada por este.
        registry.addResourceHandler("/uploads/**")
                // Y estos recursos se buscarán en la ubicación de nuestro directorio UPLOAD_DIRECTORY.
                // "file:" es el prefijo para indicar que es una ubicación en el sistema de archivos.
                // Terminamos con "/" para indicar que es un directorio.
                .addResourceLocations("file:" + UPLOAD_DIRECTORY + File.separator);
    }
}
