package com.ccs.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
// @JsonIgnoreProperties({"complaintRooms", "staff", "orgUser", "clients", "products"})
public class User { 
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
  
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;
  
    @Column(name = "name")
    private String name;

    @Column(name = "role")
    private String role;

    @OneToMany(mappedBy = "orgUser")
    @JsonIgnore
    private List<ComplaintRoom> complaintRooms;

    @OneToMany(mappedBy = "orgUser")
    @JsonIgnore
    private List<User> staff;

    @ManyToOne
    @JoinColumn(name="org_id", nullable = true)
    private User orgUser;

    @ManyToMany(mappedBy = "orgs")
    @JsonIgnore
    private List<Client> clients;

    @OneToMany(mappedBy = "orgUser")
    @JsonIgnore
    private List<Product> products;
  
    public User() {
  
    }
  
    public User(String email, String name, String role, String password) {
      this.email = email;
      this.name = name;
      this.role = role;
      this.password = password;
    }
  
    public long getId() {
      return id;
    }
  
    public String getEmail() {
      return email;
    }
  
    public void setEmail(String email) {
      this.email = email;
    }
  
    public String getName() {
      return name;
    }
  
    public void setName(String name) {
      this.name = name;
    }

    public String getRole() {
      return role;
    }

    public void setRole(String role) {
      this.role = role;
    }

    public List<ComplaintRoom> getComplaintRooms() {
      return complaintRooms;
    }

    public String getPassword() {
      return password;
    }

    public void setPassword(String password) {
      this.password = password;
    }

    public List<User> getStaff() {
      return staff;
    }

    public User getOrgUser() {
      return orgUser;
    }

    public void setOrgUser(User orgUser) {
      this.orgUser = orgUser;
    }

    @JsonIgnore
    public List<Client> getClients() {
      return clients;
    }

    public List<Product> getProducts() {
      return products;
    }
  
    @Override
    public String toString() {
      return "User [id=" + id + ", email=" + email + ", name=" + name + ", role=" + role + "]";
    }
}
