package com.ccs.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ccs.backend.model.ComplaintMessage;

public interface ComplaintMessageRepository extends JpaRepository<ComplaintMessage, Long> {
    List<ComplaintMessage> findByComplaintRoomId(Long complaintRoomId);
}