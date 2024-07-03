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
import org.springframework.web.bind.annotation.RestController;

import com.tax.demo.entities.ClientesEntity;
import com.tax.demo.services.ClientesService;


@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(path="Cliente")
public class ClientesController {
    @Autowired
    private ClientesService clientesService;


    @GetMapping
    public List<ClientesEntity> getClientes(){
        return clientesService.getClientes();
    }

  
    @PostMapping
    public void insertar(@RequestBody ClientesEntity consulta){
        clientesService.insertaroactualizar(consulta);
    }



    @DeleteMapping("/{id}")
    public void insertar(@PathVariable("id") Long id){
        clientesService.borrar(id);
    }


 
    @GetMapping("/{id}")
    public Optional<ClientesEntity> getCliente(@PathVariable("id") Long id){
        return clientesService.getCliente(id);
    }

}
