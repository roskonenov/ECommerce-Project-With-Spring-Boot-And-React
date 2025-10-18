package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.payload.dto.AddressDTO;
import com.ecommerce.project.payload.response.AddressResponse;
import com.ecommerce.project.service.AddressService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> addAddress(@Valid @RequestBody AddressDTO addressDTO) {
        return new ResponseEntity<>(
                addressService.createAddress(addressDTO),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/addresses")
    public ResponseEntity<AddressResponse> getAllAddresses(
            @RequestParam(defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ) {
        return new ResponseEntity<>(
                addressService.getAllAddresses(pageNumber, pageSize, sortBy, sortOrder),
                HttpStatus.OK
        );
    }

    @GetMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long addressId) {
        return new ResponseEntity<>(
                addressService.getAddressById(addressId),
                HttpStatus.OK
        );
    }

    @GetMapping("/users/addresses")
    public ResponseEntity<List<AddressDTO>> getUsersAddresses() {
        return new ResponseEntity<>(
                addressService.getUsersAddresses(),
                HttpStatus.OK
        );
    }

    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(
            @PathVariable Long addressId,
            @Valid @RequestBody AddressDTO addressDTO) {
        return new ResponseEntity<>(
                addressService.updateAddress(addressId, addressDTO),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> deleteAddress(@PathVariable Long addressId) {
        return new ResponseEntity<>(
                addressService.removeAddress(addressId),
                HttpStatus.OK
        );
    }
}
