package com.tax.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tax.demo.entities.ObligacionesEntity;

@Repository
public interface ObligacionesRepository extends JpaRepository<ObligacionesEntity, Long>{

}
