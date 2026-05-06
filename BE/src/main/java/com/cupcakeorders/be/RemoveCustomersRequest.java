package com.cupcakeorders.be;

import java.util.List;

public record RemoveCustomersRequest(List<Long> ids) {
}
