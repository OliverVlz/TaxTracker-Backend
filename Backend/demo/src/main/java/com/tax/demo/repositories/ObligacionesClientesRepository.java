package com.tax.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tax.demo.entities.ObligacionesClientesEntity;


@Repository
public interface ObligacionesClientesRepository extends JpaRepository<ObligacionesClientesEntity, Long>{

}
