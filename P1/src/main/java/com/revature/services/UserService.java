package com.revature.services;

import com.revature.DAOs.UserDAO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    public User deleteUser(int userId) {
        User user = userDAO.findById(userId).orElseThrow(() -> {
            throw new IllegalArgumentException("User with ID " + userId + " doesn't exist");
        });
        userDAO.deleteById(userId);
        return user;
    }
}
