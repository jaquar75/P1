package com.revature.services;

import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User insertUser(User user) {
        if (user.getUsername() == null || user.getUsername().isBlank()) {
            throw new IllegalArgumentException("No fields should be null or blank");
        }
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("No fields should be null or blank");
        }
        if (user.getFirstName() == null || user.getFirstName().isBlank()) {
            throw new IllegalArgumentException("No fields should be null or blank");
        }
        if (user.getLastName() == null || user.getLastName().isBlank()) {
            throw new IllegalArgumentException("No fields should be null or blank");
        }
        return userDAO.save(user);
    }

    public List<OutgoingUserDTO> getAllUsers() {
        List<OutgoingUserDTO> outgoingUsers = new ArrayList<>();
        List<User> users = userDAO.findAll();
        for(User user : users) {
            outgoingUsers.add(new OutgoingUserDTO(
                    user.getUserId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getUsername(),
                    user.getRole()
            ));
        }
        return outgoingUsers;
    }

    public User deleteUser(int userId) {
        User user = userDAO.findById(userId).orElseThrow(() -> {
            throw new IllegalArgumentException("User with ID " + userId + " doesn't exist");
        });
        userDAO.deleteById(userId);
        return user;
    }

    public User promoteUser(int userId) {
        User user = userDAO.findById(userId).orElseThrow(() -> {
            throw new IllegalArgumentException("User with ID " + userId + " doesn't exist");
        });
        user.setRole("Manager");
        return userDAO.save(user); // save allows us to save and return an object
    }
}
