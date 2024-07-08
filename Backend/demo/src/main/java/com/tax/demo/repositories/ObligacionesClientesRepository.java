package com.tax.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.tax.demo.entities.ObligacionesClientesEntity;
import com.tax.demo.entities.UsuarioEntity;

import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface ObligacionesClientesRepository extends JpaRepository<ObligacionesClientesEntity, Long> {
    @Modifying
    @Transactional
    @Query(value="update obligaciones_clientes set estado = 'notificado' where id_obligaciones_cliente = :id" , nativeQuery=true)
    void getActualizarEstado(@Param("id") Long id);
}
