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

import com.tax.demo.entities.ObligacionesEntity;
import com.tax.demo.services.ObligacionesService;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(path="Obligaciones")
public class ObligacionesController {
    @Autowired
    private ObligacionesService obligacionesService;


    @GetMapping("/")
    public List<ObligacionesEntity> getObligaciones(){
        return obligacionesService.getObligaciones();
    }

  
    @PostMapping
    public void insertar(@RequestBody ObligacionesEntity consulta){
        obligacionesService.insertaroactualizar(consulta);
    }



    @DeleteMapping("/{id}")
    public void insertar(@PathVariable("id") Long id){
        obligacionesService.borrar(id);
    }


 
    @GetMapping("/{id}")
    public Optional<ObligacionesEntity> getConsulta(@PathVariable("id") Long id){
        return obligacionesService.getObligacion(id);
    }
}
