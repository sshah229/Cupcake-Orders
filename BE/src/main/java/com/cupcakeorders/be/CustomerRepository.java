package com.cupcakeorders.be;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerRepository {

	private static final RowMapper<Customer> CUSTOMER_ROW_MAPPER = new RowMapper<>() {
		@Override
		public Customer mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new Customer(
					rs.getLong("id"),
					rs.getString("first_name"),
					rs.getString("last_name"),
					rs.getInt("num_chocolate"),
					rs.getInt("num_vanilla"),
					rs.getInt("num_strawberry")
			);
		}
	};

	private final JdbcTemplate jdbcTemplate;

	public CustomerRepository(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void addCustomer(AddCustomerRequest request) {
		jdbcTemplate.update(
				"""
				INSERT INTO customers (first_name, last_name, num_chocolate, num_vanilla, num_strawberry)
				VALUES (?, ?, ?, ?, ?)
				""",
				request.firstName(),
				request.lastName(),
				request.numChocolate(),
				request.numVanilla(),
				request.numStrawberry()
		);
	}

	public List<Customer> getAllCustomers() {
		return jdbcTemplate.query(
				"""
				SELECT id, first_name, last_name, num_chocolate, num_vanilla, num_strawberry
				FROM customers
				ORDER BY id
				""",
				CUSTOMER_ROW_MAPPER
		);
	}

	public void removeCustomersByIds(List<Long> ids) {
		if (ids == null || ids.isEmpty()) {
			return;
		}

		String placeholders = String.join(",", Collections.nCopies(ids.size(), "?"));
		String sql = "DELETE FROM customers WHERE id IN (" + placeholders + ")";
		jdbcTemplate.update(sql, ids.toArray());
	}
}
