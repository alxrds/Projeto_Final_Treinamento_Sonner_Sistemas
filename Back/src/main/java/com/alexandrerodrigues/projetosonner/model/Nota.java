package com.alexandrerodrigues.projetosonner.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Nota implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private Integer numero;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dataNota;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @OneToMany(mappedBy = "nota", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ItemNota> items;

    private BigDecimal ValorNota;

    public Nota() {
        super();
        this.setDataNota(LocalDateTime.now());
        this.setNumero(hashCode());
    }

    public Nota(Integer id, Integer numero, LocalDateTime dataNota, Cliente cliente, List<ItemNota> items, BigDecimal valorNota) {
        this.id = id;
        this.setNumero(hashCode());
        this.setDataNota(LocalDateTime.now());
        this.cliente = cliente;
        this.items = items;
        this.ValorNota = valorNota;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public LocalDateTime getDataNota() {
        return dataNota;
    }

    public void setDataNota(LocalDateTime dataNota) {
        this.dataNota = dataNota;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<ItemNota> getItems() {
        return items;
    }

    public void setItems(List<ItemNota> items) {
        this.items = items;
    }

    public BigDecimal getValorNota() {
        return ValorNota;
    }

    public void setValorNota(BigDecimal valorNota) {
        ValorNota = valorNota;
    }

}