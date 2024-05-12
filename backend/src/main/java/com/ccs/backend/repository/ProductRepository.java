package com.ccs.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ccs.backend.model.Product;
import com.ccs.backend.model.User;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStatus(String status);

    List<Product> findByNameContaining(String name);

    List<Product> findByOrgUser(User orgUser);
}
