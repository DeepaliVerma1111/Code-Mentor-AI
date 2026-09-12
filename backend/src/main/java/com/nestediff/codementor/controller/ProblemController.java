package com.nestediff.codementor.controller;

import com.nestediff.codementor.model.Problem;
import com.nestediff.codementor.repository.ProblemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin(origins = { "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5173",
        "http://127.0.0.1:5173" })
public class ProblemController {

    private final ProblemRepository problemRepository;

    public ProblemController(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    @GetMapping
    public List<Problem> getProblems() {
        return problemRepository.findAll();
    }
}