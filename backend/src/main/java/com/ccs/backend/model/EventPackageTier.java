package com.ccs.backend.model;

import com.ccs.backend.enums.EventPackageTierType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "event_package_tiers")
public class EventPackageTier {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "type")
    @Enumerated(EnumType.ORDINAL) 
    private EventPackageTierType type;

    @Column(name = "price")
    private double price;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    @JsonIgnore
    private EventRequest event;

    public EventPackageTier() {
    }

    public EventPackageTier(EventPackageTierType type, double price) {
        this.type = type;
        this.price = price;
    }

    public long getId() {
        return id;
    }

    public EventPackageTierType getType() {
        return type;
    }

    public double getPrice() {
        return price;
    }

    public EventRequest getEvent() {
        return event;
    }

    public void setType(EventPackageTierType type) {
        this.type = type;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setEvent(EventRequest event) {
        this.event = event;
    }

}
