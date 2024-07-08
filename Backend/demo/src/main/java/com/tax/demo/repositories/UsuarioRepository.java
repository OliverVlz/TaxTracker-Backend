package com.tax.demo.repositories;

import com.tax.demo.entities.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long>{
    @Query(value="select e.* from Usuario e where e.usuario = :usuario and e.password = :password", nativeQuery=true)
    UsuarioEntity findByLogin(@Param("usuario") String usuario, @Param("password") String password);
}
