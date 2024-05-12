package com.ccs.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email", unique = true)
    private String email;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "org_client", 
      joinColumns = @JoinColumn(name = "org_id", referencedColumnName = "id"), 
      inverseJoinColumns = @JoinColumn(name = "client_id", 
      referencedColumnName = "id"))
    @JsonIgnore
    private List<User> orgs;

    public Client() {
    }

    public Client(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<User> getOrgs() {
        return orgs;
    }

}
