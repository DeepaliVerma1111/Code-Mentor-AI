package com.nestediff.codementor.controller;

import com.nestediff.codementor.model.AnalyzeRequest;
import com.nestediff.codementor.model.HintRequest;
import com.nestediff.codementor.model.MentorResponse;
import com.nestediff.codementor.model.Problem;
import com.nestediff.codementor.repository.ProblemRepository;
import com.nestediff.codementor.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mentor")
@CrossOrigin(origins = {
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
})
public class MentorController {

    private final GeminiService service;
    private final ProblemRepository problemRepository;

    public MentorController(
            GeminiService service,
            ProblemRepository problemRepository
    ) {
        this.service = service;
        this.problemRepository = problemRepository;
    }

    @PostMapping("/analyze")
    public ResponseEntity<MentorResponse> analyze(
            @RequestBody AnalyzeRequest request
    ) {
        return ResponseEntity.ok(
                service.analyze(
                        problemText(request.problemId()),
                        request.code(),
                        attempt(request.attemptNumber())
                )
        );
    }

    @PostMapping("/hint")
    public ResponseEntity<Map<String, String>> hint(
            @RequestBody HintRequest request
    ) {
        return ResponseEntity.ok(
                Map.of(
                        "hint",
                        service.hint(
                                problemText(request.problemId()),
                                request.code(),
                                attempt(request.attemptNumber())
                        )
                )
        );
    }

    private int attempt(Integer attemptNumber) {
        return attemptNumber == null || attemptNumber < 1
                ? 1
                : attemptNumber;
    }

    private String problemText(Integer problemId) {

        int id = problemId == null ? 1 : problemId;

        Problem problem = problemRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Problem not found with ID: " + id
                        )
                );

        return "Problem: " + problem.getTitle()
                + "\nDifficulty: " + problem.getDifficulty()
                + "\nConcept: " + problem.getConcept()
                + "\nDescription: " + problem.getDescription();
    }
}