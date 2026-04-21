package com.jar.jar;

import com.jar.jar.model.Message;
import com.jar.jar.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.jar.jar.security.SecurityConfig;

import java.util.List;

@RestController
public class HelloController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/hello")
    public Message saveMessage(@RequestBody Message message) {
        return messageRepository.save(message);
        
    }

    @GetMapping("/hello")
    public List<Message> getMessages() {
        List<Message> messages = messageRepository.findAll();
        if (messages.isEmpty()) {
            Message defaultMessage = new Message("Hello, World!");
            messageRepository.save(defaultMessage);
            return messageRepository.findAll();
        }
        return messages;
    }

    @DeleteMapping("/hello/{id}")
    public void deleteMessage(@PathVariable Long id) {
        messageRepository.deleteById(id);
    }
}