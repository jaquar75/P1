package com.revature.controllers;

import com.revature.aspects.AdminOnly;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import jdk.jshell.Snippet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class ReimbursementController {

    private ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    @PostMapping
    public ResponseEntity<Reimbursement> insertReimbursement(@RequestBody IncomingReimbursementDTO reimbursementDTO) {
        return ResponseEntity.ok(reimbursementService.insertReimbursement(reimbursementDTO));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Reimbursement>> findByUserUserId(@PathVariable int userId) {
        return ResponseEntity.ok(reimbursementService.findByUserUserId(userId));
    }

    @GetMapping("/{userId}/{status}")
    public ResponseEntity<List<Reimbursement>> findByUserUserIdAndStatus(@PathVariable int userId, @PathVariable String status) {
        return ResponseEntity.ok(reimbursementService.findByUserUserIdAndStatus(userId, status));
    }

    @AdminOnly
    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        return ResponseEntity.ok(reimbursementService.getAllReimbursements());
    }

    @AdminOnly
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Reimbursement>> findByStatus(@PathVariable String status) {
        return ResponseEntity.ok(reimbursementService.findByStatus(status));
    }

    @AdminOnly
    @PatchMapping("/status/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbursementStatus(@PathVariable int reimbId, @RequestBody String status) {
        return ResponseEntity.ok(reimbursementService.updateReimbursementStatus(reimbId, status));
    }

    @PatchMapping("/description/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbursementDescription(@PathVariable int reimbId, @RequestBody String description){
        return ResponseEntity.ok(reimbursementService.updateReimbursementDescription(reimbId, description));
    }
}
