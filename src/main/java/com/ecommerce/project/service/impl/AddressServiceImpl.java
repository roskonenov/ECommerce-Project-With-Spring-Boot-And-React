package com.ecommerce.project.service.impl;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.model.Address;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.payload.AddressResponse;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.repositories.AddressRepository;
import com.ecommerce.project.service.AddressService;
import com.ecommerce.project.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.ecommerce.project.util.AppUtil.getSorting;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final ModelMapper modelMapper;
    private final AddressRepository addressRepository;
    private final AuthUtil authUtil;

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO) {
        Address address = modelMapper.map(addressDTO, Address.class);
        User user = authUtil.loggedInUser();
        user.getAddresses().add(address);
        address.setUser(user);
        return modelMapper.map(addressRepository.save(address), AddressDTO.class);
    }

    @Override
    public AddressResponse getAllAddresses(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sorting = getSorting(sortBy, sortOrder);

        Page<Address> addressPage = Optional.of(
                        addressRepository
                                .findAll(PageRequest.of(pageNumber, pageSize, sorting))
                )
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> new APIException("No products found!", HttpStatus.OK));

        return new AddressResponse()
                .setContent(addressPage
                        .stream()
                        .map(address -> modelMapper.map(address, AddressDTO.class))
                        .toList()
                ).setPageNumber(addressPage.getNumber())
                .setPageSize(addressPage.getSize())
                .setTotalElements(addressPage.getTotalElements())
                .setTotalPages(addressPage.getTotalPages())
                .setLastPage(addressPage.isLast());
    }
}
