package com.ccs.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ccs.backend.model.Client;
import com.ccs.backend.model.ComplaintMessage;
import com.ccs.backend.model.ComplaintRoom;
import com.ccs.backend.model.Product;
import com.ccs.backend.model.User;
import com.ccs.backend.repository.ClientRepository;
import com.ccs.backend.repository.ComplaintMessageRepository;
import com.ccs.backend.repository.ComplaintRoomRepository;
import com.ccs.backend.repository.ProductRepository;
import com.ccs.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    ComplaintRoomRepository complaintRoomRepository;

    @Autowired
    ComplaintMessageRepository complaintMessageRepository;

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String email) {
        try {
            List<User> users = new ArrayList<User>();

            if (email == null)
                userRepository.findAll().forEach(users::add);
            else
                userRepository.findByEmail(email).forEach(users::add);

            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<User> createUser(@RequestBody User user, @RequestParam(required = false) Long orgId) {
      try {
        if (orgId != null) {
          Optional<User> orgData = userRepository.findById(orgId);
          if (orgData.isPresent()) {
            user.setOrgUser(orgData.get());
          } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
        User _user = userRepository
            .save(new User(user.getEmail(), user.getName(), user.getRole(), user.getPassword()));
        return new ResponseEntity<>(_user, HttpStatus.CREATED);
      } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            User _user = userData.get();
            _user.setEmail(user.getEmail());
            _user.setPassword(user.getPassword());
            _user.setRole(user.getRole());
            _user.setOrgUser(user.getOrgUser());
            return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<HttpStatus> deleteAllUsers() {
        try {
            userRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

    @GetMapping("/{id}/complaint-rooms")
    public ResponseEntity<List<ComplaintRoom>> getUserComplaintRooms(@PathVariable("id") long id, @RequestParam(required = false) Long clientId, @RequestParam(required = false) String status) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            if (clientId == null && status == null) {
                return new ResponseEntity<>(userData.get().getComplaintRooms(), HttpStatus.OK);
            }
            else {
                List<ComplaintRoom> complaintRooms = new ArrayList<ComplaintRoom>();
                for (ComplaintRoom complaintRoom : userData.get().getComplaintRooms()) {
                    if (clientId != null && status != null) {
                        if (complaintRoom.getClient().getId() == clientId && complaintRoom.getStatus().equals(status.toUpperCase())) {
                            complaintRooms.add(complaintRoom);
                        }
                    } else if (clientId != null) {
                        if (complaintRoom.getClient().getId() == clientId) {
                            complaintRooms.add(complaintRoom);
                        }
                    } else if (status != null) {
                        if (complaintRoom.getStatus().equals(status.toUpperCase())) {
                            complaintRooms.add(complaintRoom);
                        }
                    }
                }
                return new ResponseEntity<>(complaintRooms, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/complaint-rooms")
    public ResponseEntity<User> addComplaintRoomToUser(@PathVariable("id") long id, @RequestParam(required = true) String clientEmail) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            User _user = userData.get();
            Optional<Client> clientData = clientRepository.findByEmail(clientEmail);
            if (clientData.isPresent()) {
                ComplaintRoom _complaintRoom = new ComplaintRoom("OPEN", _user, clientData.get());
                complaintRoomRepository.save(_complaintRoom);
                return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/complaint-rooms")
    public ResponseEntity<ComplaintRoom> updateComplaintRoomToUser(@PathVariable("id") long id, @RequestBody ComplaintRoom complaintRoom) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            // User _user = userData.get();
            Optional<ComplaintRoom> complaintRoomData = complaintRoomRepository.findById(complaintRoom.getId());
            // _user.getComplaintRooms().add(complaintRoom);
            if (complaintRoomData.isPresent()) {
                ComplaintRoom _complaintRoom = complaintRoomData.get();
                _complaintRoom.setStatus(complaintRoom.getStatus().toUpperCase());
                return new ResponseEntity<>(complaintRoomRepository.save(_complaintRoom), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("{id}/complaint-rooms/{complaintRoomId}")
    public ResponseEntity<List<ComplaintMessage>> getUserComplaintRoomById(@PathVariable("id") long id, @PathVariable("complaintRoomId") long complaintRoomId) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            Optional<ComplaintRoom> complaintRoomData = complaintRoomRepository.findById(complaintRoomId);
            if (complaintRoomData.isPresent()) {
                ComplaintRoom _complaintRoom = complaintRoomData.get();
                return new ResponseEntity<>(_complaintRoom.getMessages(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/complaint-rooms/{complaintRoomId}")
    public ResponseEntity<ComplaintMessage> addUserToComplaintRoom(@PathVariable("id") Long id, @PathVariable("complaintRoomId") Long complaintRoomId, @RequestParam(required = false) String clientEmail, @RequestParam(required = false) Long orgId, @RequestBody String message) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            if (clientEmail != null) {
                Optional<Client> clientData = clientRepository.findByEmail(clientEmail);
                if (clientData.isPresent()) {
                    Optional<ComplaintRoom> complaintRoomData = complaintRoomRepository.findById(complaintRoomId);
                    if (complaintRoomData.isPresent()) {
                        ComplaintRoom _complaintRoom = complaintRoomData.get();
                        ComplaintMessage _complaintMessage = new ComplaintMessage(message);
                        _complaintMessage.setClient(clientData.get());
                        _complaintMessage.setComplaintRoom(_complaintRoom);
                        complaintMessageRepository.save(_complaintMessage);
                        return new ResponseEntity<>(_complaintMessage, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                    }
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } else if (orgId != null) {
                Optional<User> orgData = userRepository.findById(orgId);
                if (orgData.isPresent()) {
                    Optional<ComplaintRoom> complaintRoomData = complaintRoomRepository.findById(complaintRoomId);
                    if (complaintRoomData.isPresent()) {
                        ComplaintRoom _complaintRoom = complaintRoomData.get();
                        ComplaintMessage _complaintMessage = new ComplaintMessage(message);
                        _complaintMessage.setOrgUser(orgData.get());
                        _complaintMessage.setComplaintRoom(_complaintRoom);
                        complaintMessageRepository.save(_complaintMessage);
                        return new ResponseEntity<>(_complaintMessage, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                    }
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/clients")
    public ResponseEntity<List<Client>> getUserClients(@PathVariable("id") long id) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get().getClients(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/staff")
    public ResponseEntity<List<User>> getUserStaff(@PathVariable("id") long id) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get().getStaff(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/org")
    public ResponseEntity<User> getUserOrg(@PathVariable("id") long id) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get().getOrgUser(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/products")
    public ResponseEntity<List<Product>> getUserProducts(@PathVariable("id") long id, @RequestParam(required = false) String status){
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            if (status == null) {
                return new ResponseEntity<>(userData.get().getProducts(), HttpStatus.OK);
            } else {
                List<Product> products = new ArrayList<Product>();
                for (Product product : userData.get().getProducts()) {
                    if (product.getStatus().equals(status.toUpperCase())) {
                        products.add(product);
                    }
                }
                return new ResponseEntity<>(products, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/products")
    public ResponseEntity<Product> addUserProduct(@PathVariable("id") long id, @RequestBody Product product) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            User _user = userData.get();
            product.setOrgUser(_user);
            return new ResponseEntity<>(productRepository.save(product), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/products/{productId}")
    public ResponseEntity<Product> getUserProductById(@PathVariable("id") long id, @PathVariable("productId") long productId) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            Optional<Product> productData = productRepository.findById(productId);
            if (productData.isPresent()) {
                return new ResponseEntity<>(productData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/products/{productId}")
    public ResponseEntity<Product> updateUserProduct(@PathVariable("id") long id, @PathVariable("productId") long productId, @RequestBody Product product) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            Optional<Product> productData = productRepository.findById(productId);
            if (productData.isPresent()) {
                Product _product = productData.get();
                _product.setName(product.getName());
                _product.setDescription(product.getDescription());
                _product.setPrice(product.getPrice());
                _product.setStatus(product.getStatus());
                return new ResponseEntity<>(productRepository.save(_product), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}/products/{productId}")
    public ResponseEntity<HttpStatus> deleteUserProduct(@PathVariable("id") long id, @PathVariable("productId") long productId) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            Optional<Product> productData = productRepository.findById(productId);
            if (productData.isPresent()) {
                productRepository.deleteById(productId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}/products")
    public ResponseEntity<HttpStatus> deleteUserProducts(@PathVariable("id") long id) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            List<Product> products = userData.get().getProducts();
            for (Product product : products) {
                productRepository.deleteById(product.getId());
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/clients/{email}")
    public ResponseEntity<Client> getClient(@PathVariable("email") String email) {
        Optional<Client> clientData = clientRepository.findByEmail(email);

        if (clientData.isPresent()) {
            return new ResponseEntity<>(clientData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/clients")
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        try {
            Client _client = clientRepository.save(new Client(client.getName(), client.getEmail()));
            return new ResponseEntity<>(_client, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/complaint-rooms")
    public ResponseEntity<List<ComplaintRoom>> getAllComplaintRooms(@RequestParam(required = true) String clientEmail, @RequestParam(required = true) Long orgId) {
        Optional<Client> clientData = clientRepository.findByEmail(clientEmail);
        Optional<User> orgData = userRepository.findById(orgId);

        if (clientData.isPresent() && orgData.isPresent()) {
            List<ComplaintRoom> complaintRooms = new ArrayList<ComplaintRoom>();
            for (ComplaintRoom complaintRoom : complaintRoomRepository.findAll()) {
                if (complaintRoom.getClient().getId() == clientData.get().getId() && complaintRoom.getOrgUser().getId() == orgData.get().getId()) {
                    complaintRooms.add(complaintRoom);
                }
            }
            return new ResponseEntity<>(complaintRooms, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
