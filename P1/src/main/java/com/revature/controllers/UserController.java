package com.revature.controllers;

import com.revature.aspects.AdminOnly;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> insertUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.insertUser(user));
    }

    @AdminOnly
    @GetMapping
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @AdminOnly
    @DeleteMapping("/{userId}")
    public ResponseEntity<User> deleteUser(@PathVariable int userId) {
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

    @AdminOnly
    @PatchMapping("/{userId}")
    public ResponseEntity<User> promoteUser(@PathVariable int userId){
        return ResponseEntity.ok(userService.promoteUser(userId));
    }

}
