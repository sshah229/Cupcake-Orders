package com.cupcakeorders.be;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CustomerService {

	private final CustomerRepository customerRepository;

	public CustomerService(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	public List<Customer> addCustomer(AddCustomerRequest request) {
		customerRepository.addCustomer(request);
		return customerRepository.getAllCustomers();
	}

	public List<Customer> getCustomers() {
		return customerRepository.getAllCustomers();
	}

	public List<Customer> removeCustomers(RemoveCustomersRequest request) {
		customerRepository.removeCustomersByIds(request.ids());
		return customerRepository.getAllCustomers();
	}
}
