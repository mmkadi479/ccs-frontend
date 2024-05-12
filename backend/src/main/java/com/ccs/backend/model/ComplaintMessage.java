package com.ccs.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "complaint_messages")
public class ComplaintMessage {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name = "message")
  private String message;

  @ManyToOne
  @JoinColumn(name = "client_id", nullable = true)
  private Client client;

  @ManyToOne
  @JoinColumn(name = "org_id", nullable = true)
  private User orgUser;

  @ManyToOne
  @JoinColumn(name = "complaint_room_id", nullable = false)
  private ComplaintRoom complaintRoom;

  public ComplaintMessage() {

  }

  public ComplaintMessage(String message) {
    this.message = message;
  }

  public long getId() {
    return id;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public ComplaintRoom getComplaintRoom() {
    return complaintRoom;
  }

  public Client getClient() {
    return client;
  }

  public void setClient(Client client) {
    this.client = client;
  }

  public User getOrgUser() {
    return orgUser;
  }

  public void setOrgUser(User orgUser) {
    this.orgUser = orgUser;
  }

  public void setComplaintRoom(ComplaintRoom complaintRoom) {
    this.complaintRoom = complaintRoom;
  }
}
