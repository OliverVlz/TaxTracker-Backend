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

import com.tax.demo.entities.ObligacionesClientesEntity;
import com.tax.demo.services.ObligacionesClientesService;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(path="ObligacionesClientes")
public class ObligacionesClientesController {
    @Autowired
    private ObligacionesClientesService obligacionesClientesService;


    @GetMapping("/")
    public List<ObligacionesClientesEntity> getObligacionesClientes(){
        return obligacionesClientesService.getObligacionesClientes();
    }

  
    @PostMapping
    public void insertar(@RequestBody ObligacionesClientesEntity consulta){
        obligacionesClientesService.insertaroactualizar(consulta);
    }



    @DeleteMapping("/{id}")
    public void insertar(@PathVariable("id") Long id){
        obligacionesClientesService.borrar(id);
    }


 
    @GetMapping("/{id}")
    public Optional<ObligacionesClientesEntity> getObligacionCliente(@PathVariable("id") Long id){
        return obligacionesClientesService.getObligacionCliente(id);
    }
}
