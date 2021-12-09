package com.alexandrerodrigues.projetosonner.controller;

import com.alexandrerodrigues.projetosonner.model.Produto;
import com.alexandrerodrigues.projetosonner.repository.ProdutoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false")
@RestController
@RequestMapping(path = "/produtos")
public class ProdutoController {

    private ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository) {
        super();
        this.produtoRepository = produtoRepository;
    }

    @PostMapping
    public ResponseEntity<Produto> save(@RequestBody Produto produto) {
        produtoRepository.save(produto);
        return new ResponseEntity<>(produto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> getAll() {
        List<Produto> produtos = new ArrayList<>();
        produtos = produtoRepository.findAll();
        return new ResponseEntity<>(produtos, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Produto>> getById(@PathVariable Integer id) {
        Optional<Produto> produto;
        try {
            produto = produtoRepository.findById(id);
            return new ResponseEntity<Optional<Produto>>(produto, HttpStatus.OK);
        }catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<Produto>>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Produto> update(@PathVariable Integer id, @RequestBody Produto newProduto) {
        return produtoRepository.findById(id).map(produto -> {
            produto.setCodigo(newProduto.getCodigo());
            produto.setDescricao(newProduto.getDescricao());
            produto.setPrecoUnitario(newProduto.getPrecoUnitario());
            Produto produtoAlterado = produtoRepository.save(produto);
            return ResponseEntity.ok().body(produtoAlterado);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "/{id}")
        public ResponseEntity<Optional<Produto>> deleteById(@PathVariable Integer id) {
        try {
            produtoRepository.deleteById(id);
            return new ResponseEntity<Optional<Produto>>(HttpStatus.OK);
        } catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<Produto>>(HttpStatus.NOT_FOUND);
        }
    }

}
