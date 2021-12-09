package com.alexandrerodrigues.projetosonner.controller;

import com.alexandrerodrigues.projetosonner.model.Cliente;
import com.alexandrerodrigues.projetosonner.repository.ClienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false")
@RestController
@RequestMapping(path = "/clientes")
public class ClienteController {

    private ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        super();
        this.clienteRepository = clienteRepository;
    }

    @PostMapping
    public ResponseEntity<Cliente> save(@RequestBody Cliente cliente) {
        clienteRepository.save(cliente);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> getAll() {
        List<Cliente> clientes = new ArrayList<>();
        clientes = clienteRepository.findAll();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Cliente>> getById(@PathVariable Integer id) {
        Optional<Cliente> cliente;
        try {
            cliente = clienteRepository.findById(id);
            return new ResponseEntity<Optional<Cliente>>(cliente, HttpStatus.OK);
        }catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<Cliente>>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Cliente> update(@PathVariable Integer id, @RequestBody Cliente newCliente) {
        return clienteRepository.findById(id).map(cliente -> {
            cliente.setCodigo(newCliente.getCodigo());
            cliente.setNome(newCliente.getNome());
            cliente.setCpf(newCliente.getCpf());
            cliente.setTelefone(newCliente.getTelefone());
            Cliente clienteAlterado = clienteRepository.save(cliente);
            return ResponseEntity.ok().body(clienteAlterado);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "/{id}")
        public ResponseEntity<Optional<Cliente>> deleteById(@PathVariable Integer id) {
        try {
            clienteRepository.deleteById(id);
            return new ResponseEntity<Optional<Cliente>>(HttpStatus.OK);
        } catch (NoSuchElementException nsee) {
            return new ResponseEntity<Optional<Cliente>>(HttpStatus.NOT_FOUND);
        }
    }

}
