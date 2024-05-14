package com.ccs.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ccs.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmail(String email);
    List<User> findByRole(String role);
    List<User> findByOrgUser(User orgUser);
    List<User> findByOrgName(String orgName);
}
