package com.tax.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tax.demo.entities.ObligacionesClientesEntity;
import com.tax.demo.repositories.ObligacionesClientesRepository;


@Service
public class ObligacionesClientesService {
    @Autowired
    ObligacionesClientesRepository obligacionesClientesRepository;

    public List<ObligacionesClientesEntity> getObligacionesClientes(){
        return obligacionesClientesRepository.findAll();
    }

    public Optional<ObligacionesClientesEntity> getObligacionCliente(Long id){
        return obligacionesClientesRepository.findById(id);
    }

    public void insertaroactualizar(ObligacionesClientesEntity obligacioncliente){
        obligacionesClientesRepository.save(obligacioncliente);
    }

    public void borrar(Long id){
        obligacionesClientesRepository.deleteById(id);
    }
}
