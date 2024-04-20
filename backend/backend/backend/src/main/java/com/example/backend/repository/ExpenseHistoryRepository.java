package com.example.backend.repository;

import com.example.backend.model.ExpenseHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseHistoryRepository extends JpaRepository<ExpenseHistory, Long> {
}