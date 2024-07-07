package com.tax.demo.entities;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Entity
@Getter
@Setter
@Table(name = "Obligaciones")
public class ObligacionesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_obligaciones;
    public String nombre;
    public String descripcion;
    
    @OneToMany(mappedBy = "obligacionesEntity", cascade = CascadeType.ALL)
    private Set<ObligacionesClientesEntity> obligacionesClientesEntities;
    
}
