package com.ccs.backend.model;

import java.util.List;

import com.ccs.backend.enums.EventRequestStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "event_requests")
public class EventRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "no_guests")
    private int no_guests;

    @Column(name = "date")
    private String date;

    @Column(name = "no_drinks")
    private int no_drinks;

    @Column(name = "location")
    private String location;

    @Column(name = "status")
    @Enumerated(EnumType.ORDINAL)
    private EventRequestStatus status;

    @Column(name = "theme")
    private String theme;

    @Column(name = "size")
    private String size;


    @OneToOne
    @JoinColumn(name = "selected_tier_id")
    private EventPackageTier selectedTier;

    @OneToMany(mappedBy = "event")
    @JsonIgnore
    private List<EventPackageTier> tiers;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User user;

    public EventRequest() {
    }

    public EventRequest(int no_guests, String date, int no_drinks, String location, EventRequestStatus status, String theme,
            String size) {
        this.no_guests = no_guests;
        this.date = date;
        this.no_drinks = no_drinks;
        this.location = location;
        this.status = status;
        this.theme = theme;
        this.size = size;
    }

    public long getId() {
        return id;
    }

    public int getNo_guests() {
        return no_guests;
    }

    public String getDate() {
        return date;
    }

    public int getNo_drinks() {
        return no_drinks;
    }

    public String getLocation() {
        return location;
    }

    public EventRequestStatus getStatus() {
        return status;
    }

    public String getTheme() {
        return theme;
    }

    public String getSize() {
        return size;
    }

    public List<EventPackageTier> getTiers() {
        return tiers;
    }

    public User getUser() {
        return user;
    }

    public EventPackageTier getSelectedTier() {
        return selectedTier;
    }

    public void setNo_guests(int no_guests) {
        this.no_guests = no_guests;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setNo_drinks(int no_drinks) {
        this.no_drinks = no_drinks;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setStatus(EventRequestStatus status) {
        this.status = status;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTiers(List<EventPackageTier> tiers) {
        this.tiers = tiers;
    }

    public void setSelectedTier(EventPackageTier selectedTier) {
        this.selectedTier = selectedTier;
    }

    @Override
    public String toString() {
        return "EventRequest [date=" + date + ", id=" + id + ", location=" + location + ", no_drinks=" + no_drinks
                + ", no_guests=" + no_guests + ", size=" + size + ", status=" + status + ", theme=" + theme + "]";
    }

}
