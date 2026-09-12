package com.nestediff.codementor.repository;

import com.nestediff.codementor.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Integer> {
}