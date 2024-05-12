package com.ccs.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ccs.backend.model.Client;
import com.ccs.backend.model.ComplaintRoom;
import com.ccs.backend.model.User;

public interface ComplaintRoomRepository extends JpaRepository<ComplaintRoom, Long> {
    List<ComplaintRoom> findByStatus(String status);
    List<ComplaintRoom> findByClient(Client client);
    List<ComplaintRoom> findByOrgUser(User orgUser);
}