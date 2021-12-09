package com.alexandrerodrigues.projetosonner.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class PrincipalController {
    @GetMapping
    public String getHello() {

        return "Servidor ta on!";

    }
}
