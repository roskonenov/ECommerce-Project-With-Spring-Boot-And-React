package com.ecommerce.project.service.impl;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Address;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.dto.AddressDTO;
import com.ecommerce.project.payload.response.AddressResponse;
import com.ecommerce.project.repositories.AddressRepository;
import com.ecommerce.project.repositories.UserRepository;
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
    private final UserRepository userRepository;

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
                .orElseThrow(() -> new APIException("No addresses found!", HttpStatus.OK));

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

    @Override
    public AddressDTO getAddressById(Long addressId) {
        return modelMapper.map(
                addressRepository.findById(addressId)
                        .orElseThrow(() -> new ResourceNotFoundException("Address", "address id", addressId)),
                AddressDTO.class
        );
    }

    @Override
    public List<AddressDTO> getUsersAddresses() {
        return Optional.of(authUtil.loggedInUser()
                .getAddresses())
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> new APIException("This user has no addresses!", HttpStatus.OK))
                .stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .toList();
    }

    @Override
    public AddressDTO updateAddress(Long addressId, AddressDTO addressDTO) {
        return modelMapper.map(
                addressRepository.findById(addressId)
                        .map(address -> {
                            modelMapper.map(addressDTO, address);

                            User user = authUtil.loggedInUser();
                            List<Address> addresses = user.getAddresses();

                            if (addresses.removeIf(a -> a.getId().equals(addressId))) {
                                addresses.add(address);
                                userRepository.save(user);
                            }
                            return address;
                        })
                        .map(addressRepository::save)
                        .orElseThrow(() -> new ResourceNotFoundException("Address", "address id", addressId)),
                AddressDTO.class
        );
    }

    @Override
    public AddressDTO removeAddress(Long addressId) {
        return modelMapper.map(
                addressRepository.findById(addressId)
                        .map(address -> {
                            addressRepository.delete(address);
                            authUtil.loggedInUser()
                                    .getAddresses()
                                    .removeIf(a -> a.getId().equals(addressId));

                            return address;
                        }).orElseThrow(() -> new ResourceNotFoundException("Address", "address id", addressId )),
                AddressDTO.class
        );
    }
}
