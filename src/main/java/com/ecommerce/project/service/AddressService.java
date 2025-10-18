package com.ecommerce.project.service;

import com.ecommerce.project.payload.dto.AddressDTO;
import com.ecommerce.project.payload.response.AddressResponse;

import java.util.List;

public interface AddressService {

    AddressDTO createAddress(AddressDTO addressDTO);

    AddressResponse getAllAddresses(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    AddressDTO getAddressById(Long addressId);

    List<AddressDTO> getUsersAddresses();

    AddressDTO updateAddress(Long addressId, AddressDTO addressDTO);

    AddressDTO removeAddress(Long addressId);
}
