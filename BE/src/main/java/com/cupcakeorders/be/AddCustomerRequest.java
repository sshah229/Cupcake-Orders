package com.cupcakeorders.be;

public record AddCustomerRequest(
		String firstName,
		String lastName,
		Integer numChocolate,
		Integer numVanilla,
		Integer numStrawberry
) {
}
