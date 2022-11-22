package com.registro.usuarios.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.registro.usuarios.servicio.UsuarioServicio;

@Controller
public class RegistroControlador {

	@Autowired
	private UsuarioServicio servicio;
	
	@GetMapping("/login")
	public String iniciarSesion() {
		return "login";
	}
	
	@GetMapping("/")
	public String verPaginaDeInicio(Model modelo) {
		modelo.addAttribute("usuarios", servicio.listarUsuarios());
		// <tr th:each="usuario : ${usuarios}">
		// 			<td th:text="${usuario.id}">ID</td>
		// 			<td th:text="${usuario.nombre}">ID</td>
		// 			<td th:text="${usuario.apellido}">ID</td>
		// 			<td th:text="${usuario.email}">ID</td>
		// 		</tr>
		return "index";
	}
}
