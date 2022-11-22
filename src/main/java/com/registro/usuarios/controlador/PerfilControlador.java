package com.registro.usuarios.controlador;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Perfil")
public class PerfilControlador {
    
    @GetMapping("/")
    public String perfil(Model model){
        return "perfil/index";
    }
}
