package com.biblioteca.crud.config;

import org.springframework.context.annotation.Configuration; // Indica que esta clase es una fuente de definiciones de beans de Spring
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry; // Para registrar manejadores de recursos
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // Interfaz para personalizar la configuración de Spring MVC
import java.io.File; // Para trabajar con rutas de archivos


@Configuration
public class WebConfig implements WebMvcConfigurer {


    private static final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + File.separator + "uploads";


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/uploads/**")

                .addResourceLocations("file:" + UPLOAD_DIRECTORY + File.separator);
    }
}
