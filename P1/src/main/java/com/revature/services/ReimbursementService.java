package com.revature.services;

import com.revature.DAOs.ReimbursementDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    private ReimbursementDAO reimbursementDAO;
    private UserDAO userDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO, UserDAO userDAO) {
        this.reimbursementDAO = reimbursementDAO;
        this.userDAO = userDAO;
    }

    public Reimbursement insertReimbursement(IncomingReimbursementDTO reimbursementDTO) {
        Reimbursement reimbursement = new Reimbursement(0,
                reimbursementDTO.getDescription(),
                reimbursementDTO.getAmount(),
                "PENDING",
                null);
        Optional<User> user = userDAO.findById(reimbursementDTO.getUserId());
        if (user.isEmpty()) {
            throw new IllegalArgumentException("No user found with ID " + reimbursementDTO.getUserId());
        } else {
            reimbursement.setUser(user.get());
            return reimbursementDAO.save(reimbursement);
        }
    }

    public List<Reimbursement> findByUserUserId(int userId) {
        return reimbursementDAO.findByUserUserId(userId);
    }

    public List<Reimbursement> findByUserUserIdAndStatus(int userId, String status) {
        return reimbursementDAO.findByUserUserIdAndStatus(userId, status);
    }

    public List<Reimbursement> getAllReimbursements() {
        return reimbursementDAO.findAll();
    }

    public List<Reimbursement> findByStatus(String status) {
        return reimbursementDAO.findByStatus(status);
    }

    public Reimbursement updateReimbursementStatus(int reimbId, String status) {
        Reimbursement reimbursement = reimbursementDAO.findById(reimbId).orElseThrow(() -> {
            throw new IllegalArgumentException("No reimbursement found with ID " + reimbId);
        });
        reimbursement.setStatus(status);
        return reimbursementDAO.save(reimbursement);
    }

    public Reimbursement updateReimbursementDescription(int reimbId, String description) {
        Reimbursement reimbursement = reimbursementDAO.findById(reimbId).orElseThrow(() -> {
            throw new IllegalArgumentException("No reimbursement found with ID " + reimbId);
        });
        reimbursement.setDescription(description);
        return reimbursementDAO.save(reimbursement);
    }
}