package com.alexandrerodrigues.projetosonner.controller;

import com.alexandrerodrigues.projetosonner.model.ItemNota;
import com.alexandrerodrigues.projetosonner.model.Nota;
import com.alexandrerodrigues.projetosonner.model.Produto;
import com.alexandrerodrigues.projetosonner.repository.NotaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false")
@RestController
@RequestMapping(path = "/notas")
public class NotaController {

    private NotaRepository notaRepository;

    public NotaController(NotaRepository notaRepository) {
        super();
        this.notaRepository = notaRepository;
    }

    @PostMapping
    public ResponseEntity<Nota>save(@RequestBody Nota nota) {
        BigDecimal totalDaNota = BigDecimal.ZERO;
        for (ItemNota itemNota: nota.getItems()) {
            itemNota.setNota(nota);
            itemNota.setValorTotal(itemNota.getQuantidade().multiply(itemNota.getProduto().getPrecoUnitario()));
            totalDaNota = totalDaNota.add(itemNota.getValorTotal());
        }
        nota.setValorNota(totalDaNota);
        notaRepository.save(nota);
        return new ResponseEntity<>(nota, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Nota>> getAll() {
        List<Nota> notas = new ArrayList<>();
        notas = notaRepository.findAll();
        return new ResponseEntity<>(notas, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Nota>>getById(@PathVariable Integer id) {
        Optional<Nota>nota;
        try {
            nota = notaRepository.findById(id);
            return new ResponseEntity<Optional<Nota>>(nota, HttpStatus.OK);
        }catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<Nota>>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Nota>update(@RequestBody Nota nota) {
        BigDecimal totalDaNota = BigDecimal.ZERO;
        for (ItemNota itemNota: nota.getItems()) {
            itemNota.setNota(nota);
            nota.setItems(itemNota.getNota().getItems());
            itemNota.setValorTotal(itemNota.getQuantidade().multiply(itemNota.getProduto().getPrecoUnitario()));
            totalDaNota = totalDaNota.add(itemNota.getValorTotal());
        }
        nota.setValorNota(totalDaNota);
        Nota notaAlterada = notaRepository.save(nota);
        return new ResponseEntity<Nota>(notaAlterada, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
        public ResponseEntity<Optional<Nota>>deleteById(@PathVariable Integer id) {
        try {
            notaRepository.deleteById(id);
            return new ResponseEntity<Optional<Nota>>(HttpStatus.OK);
        } catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<Nota>>(HttpStatus.NOT_FOUND);
        }
    }
}
