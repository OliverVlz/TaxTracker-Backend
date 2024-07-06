package com.tax.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tax.demo.services.UsuarioService;
import com.tax.demo.entities.UsuarioEntity;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(path="Usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;


    @GetMapping("/")
    public List<UsuarioEntity> getUsuarios(){
        return usuarioService.getUsuarios();
    }

    @GetMapping("/Login")
    public UsuarioEntity ValidarLogin(@RequestParam("usuario") String usuario, @RequestParam("password") String password){
    return usuarioService.ValidarLogin(usuario, password);
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

