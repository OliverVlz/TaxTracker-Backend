package com.tax.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tax.demo.entities.ObligacionesEntity;
import com.tax.demo.repositories.ObligacionesRepository;


@Service
public class ObligacionesService {
    @Autowired
    ObligacionesRepository obligacionesrepository;

    public List<ObligacionesEntity> getObligaciones(){
        return obligacionesrepository.findAll();
    }

    public Optional<ObligacionesEntity> getObligacion(Long id){
        return obligacionesrepository.findById(id);
    }

    public void insertaroactualizar(ObligacionesEntity obligacion){
        obligacionesrepository.save(obligacion);
    }

    public void borrar(Long id){
        obligacionesrepository.deleteById(id);
    }
}
