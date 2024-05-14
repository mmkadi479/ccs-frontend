package com.ccs.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name="org_id", nullable = false)
    private User orgUser;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<ComplaintRoom> complaintRooms;

    public Product() {
    }

    public Product(String name, String description, double price, String status) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setOrgUser(User orgUser) {
        this.orgUser = orgUser;
    }

    public User getOrgUser() {
        return orgUser;
    }

    public List<ComplaintRoom> getComplaintRooms() {
        return complaintRooms;
    }

    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + ", desc=" + description + ", price=" + price + ", org=" + orgUser.getName() + "]";
    }
}
