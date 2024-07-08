package com.tax.demo.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Entity
@Getter
@Setter
@Table(name = "ObligacionesClientes")
public class ObligacionesClientesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_obligaciones_cliente;
    //public Long id_cliente;
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private ClientesEntity clientesEntity;

    //public Long id_obligacion;
    @ManyToOne
    @JoinColumn(name = "id_obligacion")
    private ObligacionesEntity obligacionesEntity;
    public Date fecha;
    public Long valor;
    public String estado;

    
}
