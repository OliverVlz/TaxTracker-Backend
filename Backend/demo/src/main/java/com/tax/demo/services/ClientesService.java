package com.tax.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tax.demo.entities.ClientesEntity;
import com.tax.demo.repositories.ClienteRepository;


@Service
public class ClientesService {
     @Autowired
    ClienteRepository clienterepository;

    public List<ClientesEntity> getClientes(){
        return clienterepository.findAll();
    }

    public Optional<ClientesEntity> getCliente(Long id){
        return clienterepository.findById(id);
    }

    public void insertaroactualizar(ClientesEntity cliente){
        clienterepository.save(cliente);
    }

    public void borrar(Long id){
        clienterepository.deleteById(id);
    }
}
