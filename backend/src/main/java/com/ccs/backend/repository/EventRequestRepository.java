package com.ccs.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ccs.backend.model.EventRequest;

public interface EventRequestRepository extends JpaRepository<EventRequest, Long> {
}
