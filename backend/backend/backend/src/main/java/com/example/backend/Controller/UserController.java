package com.example.backend.Controller;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;


@RestController
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email already in use. Please use a different email.");
            return ResponseEntity.badRequest().body(error);
        }


        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);


        Map<String, Object> response = new HashMap<>();
        response.put("id", savedUser.getId());
        response.put("email", savedUser.getEmail());
        response.put("name", savedUser.getName());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User savedUser = userRepository.findByEmail(user.getEmail());
        if (savedUser == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "User not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }

        if (!passwordEncoder.matches(user.getPassword(), savedUser.getPassword())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid password.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("id", savedUser.getId());
        response.put("email", savedUser.getEmail());
        response.put("name", savedUser.getName());

        return ResponseEntity.ok(response);
    }
}