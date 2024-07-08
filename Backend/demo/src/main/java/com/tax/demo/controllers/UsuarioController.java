package com.tax.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tax.demo.services.UsuarioService;
import com.tax.demo.entities.UsuarioEntity;

@RestController
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping(path="Usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;


    @GetMapping("/")
    public List<UsuarioEntity> getUsuarios(){
        return usuarioService.getUsuarios();
    }

    @GetMapping("/Login")
    public ResponseEntity<?> validarLogin(@RequestParam("usuario") String usuario, @RequestParam("password") String password){
        UsuarioEntity usuarioValidado = usuarioService.ValidarLogin(usuario, password);
        System.out.println(usuarioService.ValidarLogin(usuario, password));
            if (usuarioValidado != null) {
                return ResponseEntity.ok(usuarioValidado); // Retorna el usuario validado si las credenciales son correctas
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas"); // Retorna un estado de no autorizado si las credenciales no son válidas
            }
        //return usuarioService.ValidarLogin(usuario, password);
    }
       
    @PostMapping
    public void insertar(@RequestBody UsuarioEntity consulta){
        usuarioService.insertaroactualizar(consulta);
    }



    @DeleteMapping("/{id}")
    public void insertar(@PathVariable("id") Long id){
        usuarioService.borrar(id);
    }


 
    @GetMapping("/{id}")
    public Optional<UsuarioEntity> getConsulta(@PathVariable("id") Long id){
        return usuarioService.getUsuario(id);
    }


}

