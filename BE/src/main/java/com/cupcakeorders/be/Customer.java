package com.cupcakeorders.be;

public record Customer(
		Long id,
		String firstName,
		String lastName,
		Integer numChocolate,
		Integer numVanilla,
		Integer numStrawberry
) {
}
