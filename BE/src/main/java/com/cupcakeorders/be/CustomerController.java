package com.cupcakeorders.be;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

	private final CustomerService customerService;

	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	@PostMapping("/add-customer")
	public List<Customer> addCustomer(@RequestBody AddCustomerRequest request) {
		return customerService.addCustomer(request);
	}

	@GetMapping("/get-customers")
	public List<Customer> getCustomers() {
		return customerService.getCustomers();
	}

	@PostMapping("/remove-customers")
	public List<Customer> removeCustomers(@RequestBody RemoveCustomersRequest request) {
		return customerService.removeCustomers(request);
	}
}
