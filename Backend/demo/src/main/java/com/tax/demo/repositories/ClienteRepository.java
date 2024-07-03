package com.tax.demo.repositories;

import com.tax.demo.entities.ClientesEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<ClientesEntity, Long>{

}
