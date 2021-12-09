package com.alexandrerodrigues.projetosonner.repository;

import com.alexandrerodrigues.projetosonner.model.ItemNota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemNotaRepository extends JpaRepository<ItemNota, Integer> {

}
