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
@Table(name = "Clientes")
public class ClientesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_cliente;
    public String id_usuario;
    public String num_identificacion;
    public String tipo_identificacion;

    @OneToMany(mappedBy = "clientesEntity", cascade = CascadeType.ALL)
    private Set<ObligacionesClientesEntity> obligacionesClientesEntities;
}
