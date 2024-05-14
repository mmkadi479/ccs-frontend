package com.ccs.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "complaint_rooms")
public class ComplaintRoom {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name = "status")
  private String status;

  @ManyToOne
  @JoinColumn(name = "client_user_id", nullable = false)
  private Client client;

  @ManyToOne
  @JoinColumn(name = "org_user_id", nullable = false)
  private User orgUser;

  @OneToMany(mappedBy = "complaintRoom")
  @JsonIgnore
  private List<ComplaintMessage> messages;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = true)
  private Product product;

  public ComplaintRoom() {

  }

  public ComplaintRoom(String status, User orgUser, Client client) {
    this.status = status;
    this.orgUser = orgUser;
    this.client = client;
  }

  public long getId() {
    return id;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public User getOrgUser() {
    return orgUser;
  }

  public Client getClient() {
    return client;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public List<ComplaintMessage> getMessages() {
    return messages;
  }

  @Override
  public String toString() {
    return "ComplaintRoom [id=" + id + ", client=" + client.getName() + ", org=" + orgUser.getName() + ", status=" + status + "]";
  }
}

